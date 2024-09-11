import { setUser, setToken } from "../redux/userSlice.tsx";
import { Cookies } from "react-cookie";
import client from 'gamja-backend-client';
import { useDispatch } from "react-redux";
import type { User } from "../redux/userSlice";

interface AuthResponse {
    token: string;
}

interface GetMyUserResponse {
    user: User;
}

const LoginModel = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const host = 'https://api.miruku.dog';

    const getConnection = (token: string | null) => {
        return {
            host: host,
            headers: {
                ...(token ? {
                    'Authorization': `Bearer ${token}`
                } : {})
            }
        };
    };

    const setCookie = (name: string, value: string, option?: object) => {
        cookies.set(name, value, { ...option });
    };

    // useEffect(() => {
    //     if (token) {
    //         setCookie("token", token, {
    //             path: '/',
    //             sameSite: 'strict'
    //         });

    //         const getMyUser = async () => {
    //             try {
    //                 const response = await client.functional.user.me.getMyUser(
    //                     getConnection()
    //                 ) as GetMyUserResponse;
    //                 const user = response.user;
    //                 setUser(user);
    //             } catch (error) {
    //                 console.error("사용자 정보 가져오기 오류: ", error);
    //             }
    //         };
    //         getMyUser();
    //     }
    // }, [token]);

    const authSignIn = async (userId: string, userPw: string) => {
        try {
            const response = await client.functional.auth.signIn(
                getConnection(null),
                { id: userId, password: userPw }
            ) as AuthResponse;

            const token = response.token;
            dispatch(setToken(token));
            setCookie("token", token, { path: '/', sameSite: 'strict' });

            const getMyUser = async () => {
                try {
                    const userResponse = await client.functional.user.me.getMyUser(
                        getConnection(token)
                    ) as GetMyUserResponse;
                    dispatch(setUser(userResponse.user));
                } catch (error) {
                    console.error("사용자 정보 가져오기 오류: ", error);
                }
            };

            await getMyUser();
        } catch (error) {
            console.error("로그인 에러: ", error);
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return { authSignIn };
}

export default LoginModel;