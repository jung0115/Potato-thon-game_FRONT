import React from "react";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import client from 'gamja-backend-client';

import { useAuth } from "../components/Context";

import cancel from '../contents/cancel.svg';

const Login = ({ onClose }) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState(null);

    const { login } = useAuth();
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
        if (userId.length === 11) {
            setUserId(userId.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        else if (userId.length === 13) {
            setUserId(userId.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [userId]);

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
                        setUserName(user.name);
                        login(user);
                    });
                } catch (error) {
                    console.error("사용자 정보 가져오기 오류: ", error);
                }
            };
            getMyUser();
        }
    }, [token, login]);

    const onChangeId = (e) => {
        setUserId(e.target.value);
    }

    const onChangePw = (e) => {
        setUserPw(e.target.value);
    }

    const authSignIn = async () => {
        if (!userId || !userPw) {
            // 입력 필드에 값이 없으면 요청을 보내지 않음
            return;
        }
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
        }
    }
    authSignIn();
    
    const CheckLogin = () => {
        console.log(userName);
        console.log(token);
        onClose(userName);
    };

    return (
        <Container>
            <Header>
                <Title> 로그인 </Title>
                <Img 
                    src={cancel}
                    onClick={() => onClose('')}
                />
            </Header>
            <Line/>
            <Body>
                <SubTitle> 아이디 </SubTitle>
                <InputForm 
                    type="text"
                    placeholder="본인 팀의 팀장 전화번호를 입력해주세요."
                    value={userId}
                    onChange={onChangeId}
                />
                <SubTitle> 비밀번호 </SubTitle>
                <InputForm 
                    type="password"
                    value={userPw}
                    onChange={onChangePw}
                />
            </Body>
            <LoginBtn onClick={() => CheckLogin()}> 로그인 </LoginBtn>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 668px;
    height: 472px;
    border-radius: 20px;
    background-color: #FFFFFF;
`;
const Header = styled.div`
    display: flex;
    flex-direction: row;
`;
const Body = styled.div`
    margin-top: 39px;
    margin-left: 40px;
`;
const Title = styled.p`
    margin: 0 auto;
    margin-top: 9px;
    margin-left: 312px;

    text-align: center;
    font-size: 25px;
    font-weight: 700;
    line-height: 150%; /* 37.5px */
    color: #212224;
`;
const SubTitle = styled.p`
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%; /* 24px */
    color: #212224;
`;
const InputForm = styled.input`
    width: 565px;
    margin: 0 0 40px 0;
    padding: 12px 0 12px 24px;
    border-radius: 6px;
    border: 1px solid #DCDFE3;
`;
const Img = styled.img`
    margin-right: 32px;
    cursor: pointer;
`;
const Line = styled.hr`
    width: 99.5%;
    height: 0.5px;
    flex-shrink: 0;
    color: #DCDFE3;
`;
const LoginBtn = styled.button`
    width: 384px;
    padding: 17px 0;
    margin-left: 146px;
    border-radius: 8px;
    background-color: #7B5F49;

    font-size: 20px;
    font-weight: 700;
    line-height: 150%; /* 30px */
    color: #FFFFFF;
    cursor: pointer;
`;
export  default Login;