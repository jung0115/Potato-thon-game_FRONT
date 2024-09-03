import React, { useState } from "react";
import styled from "styled-components";
import LoginController from "../controller/LoginController";
import cancel from '../contents/cancel.svg';

const Login = ({ onClose }) => {
    const { handleLogin, token } = LoginController();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    
    const isInputCheck = userId  && userPw;

    const onChangeId = (e) => {
        setUserId(e.target.value);
    }

    const onChangePw = (e) => {
        setUserPw(e.target.value);
    }

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
                onClick={() => handleLogin()}
                isinputcheck={isInputCheck}
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