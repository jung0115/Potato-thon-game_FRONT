import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import client from 'gamja-backend-client';

interface User {
    id: string;
    name: string;
    balance: string;
    email?: string;  // email을 선택적 속성으로 변경
}

interface AuthResponse {
    token: string;
}

interface GetMyUserResponse {
    user: User;
}

const LoginModel = () => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const cookies = new Cookies();

    const host = 'https://api.miruku.dog';

    const getConnection = () => {
        return {
            host: host,
            headers: {
                ...(token ? {
                    'Authorization': `Bearer ${token}`
                } : {})
            }
        };
    }

    const setCookie = (name: string, value: string, option?: object) => {
        cookies.set(name, value, { ...option });
    }

    useEffect(() => {
        if (token) {
            setCookie("token", token, {
                path: '/',
                sameSite: 'strict'
            });

            const getMyUser = async () => {
                try {
                    const response = await client.functional.user.me.getMyUser(
                        getConnection()
                    ) as GetMyUserResponse;
                    const user = response.user;
                    setUser(user);
                } catch (error) {
                    console.error("사용자 정보 가져오기 오류: ", error);
                }
            };
            getMyUser();
        }
    }, [token]);

    const authSignIn = async (userId: string, userPw: string) => {
        try {
            const response = await client.functional.auth.signIn(
                getConnection(),
                { id: userId, password: userPw }
            ) as AuthResponse;
            setToken(response.token);
        } catch (error) {
            console.error("로그인 에러: ", error);
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return { user, token, authSignIn };
}

export default LoginModel;