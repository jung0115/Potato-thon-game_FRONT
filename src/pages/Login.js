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
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);

    const { login } = useAuth();
    const cookies = new Cookies();

    const host = 'https://api.miruku.dog';

    const isInputCheck = userId  && userPw;

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
    
    useEffect(() => {
        // authSignIn 함수를 여기서 호출하여 로그인 시도
        authSignIn();
    }, [userId, userPw]);

    const CheckLogin = () => {
        console.log(user.name);
        console.log(token);
        onClose(user.name);
        login(user);
    };

    return (
        <Container>
            <Header>
                <TitleContainer>
                    <Title> 감자톤 주식 게임에 어서오세요! </Title>
                    <SubTitle> 로그인 이후, 모든 기능을 이용할 수 있어요. </SubTitle>
                </TitleContainer>
                {!isInputCheck && 
                    <Img 
                        src={cancel}
                        onClick={() => onClose('')}
                    />
                }
            </Header>
            {/* <Line/> */}
            <Body>
                <BodyTitle> 아이디 </BodyTitle>
                <InputForm 
                    type="text"
                    placeholder="본인의 팀명을 작성해주세요."
                    value={userId}
                    onChange={onChangeId}
                />
                <BodyTitle> 비밀번호 </BodyTitle>
                <InputForm 
                    type="password"
                    value={userPw}
                    onChange={onChangePw}
                />
            </Body>
            <LoginBtn 
                onClick={() => CheckLogin()}
                isInputCheck={isInputCheck}
            > 로그인 </LoginBtn>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 588px;
    height: 496px;
    border-radius: 20px;
    background-color: #FFFFFF;
    box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.07);
`;
const Header = styled.div`
    display: flex;
    flex-direction: row;
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 28px 0 0 45px;
`;
const Title = styled.p`
    font-size: 25px;
    font-family: 'Pretendard-Bold';
    line-height: 150%; /* 37.5px */
    margin-bottom: 12px;
    color: #212224;
`;
const SubTitle = styled.p`
    font-size: 18px;
    color: '#4D5359';
    font-family: 'Pretendard-SemiBold';
    margin: 0 auto;
`;
const Body = styled.div`
    margin-top: 45px;
    margin-left: 60px;
`;
const BodyTitle = styled.div`
    /* margin: 0 0 4px 0; */
    font-size: 16px;
    font-family: 'Pretendard-SemiBold';
    line-height: 150%; /* 24px */
    color: #212224;
`;
const InputForm = styled.input`
    width: 419px;
    margin: 8px 0 15px 0;
    padding: 12px 0 12px 24px;
    border-radius: 6px;
    border: 1px solid #FF7710;
`;
const Img = styled.img`
    position: absolute;
    margin: 28px 20px 80px 528px;
    float: right;
    cursor: pointer;
`;
const LoginBtn = styled.button`
    width: 362px;
    padding: 13px 28px;
    margin: 45px auto;
    border-radius: 8px;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.isInputCheck ? '#8A6123' : ' #C8B28F'};

    font-size: 20px;
    font-family: 'Pretendard-SemiBold';
    line-height: 150%; /* 30px */
    color: #FFFFFF;
    cursor: pointer;
`;
export  default Login;