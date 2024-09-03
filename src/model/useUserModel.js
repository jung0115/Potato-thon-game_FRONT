import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import client from 'gamja-backend-client';

const useUserModel = () => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
    const cookies = new Cookies();

    const host = 'https://api.miruku.dog';

    const getConnection = () => {
        return {
            host: host,
            headers: {
                ...token ? {
                'Authorization': `Bearer ${token}`
                } : null
            }
        }
    }

    const setCookie = (name, value, option) => {
        return cookies.set(name, value, {...option});
    }

    useEffect(() => {
        if (token) {
            setCookie("token", `${token}`, {
                path: '/',
                sameSite: 'strict'
            });

            const getMyUser = async () => {
                try {
                    await client.functional.user.me.getMyUser(
                        getConnection()
                    ).then(response => {
                        const user = response.user;
                        setUser(user);
                    });
                } catch (error) {
                    console.error("사용자 정보 가져오기 오류: ", error);
                }
            };
            getMyUser();
        }
    }, [token]);

    const authSignIn = async (userId, userPw) => {
        try {
            await client.functional.auth.signIn(
                getConnection(),
                {
                    id: userId, 
                    password: userPw
                }
            ).then(response => {
                setToken(response.token);
            });
        } catch (error) {
            console.error("로그인 에러: ", error);
            alert('아이디 또는 비밀번호가 일치하지 않습니다.')
        }
    };

    return { user, token, authSignIn };
}
export default useUserModel;