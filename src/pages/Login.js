import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import cancel from '../contents/cancel.svg';


const Login = ({ onClose }) => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const realId = '010-0000-0000';
    const realPw = 'pwpw1';

    useEffect(() => {
        console.log(id);
        if (id.length === 11) {
            setId(id.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        else if (id.length === 13) {
            setId(id.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [id]);

    const onChamgeId = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
            setId(e.target.value);
        }
    }

    const onChamgePw = (e) => {
        setPw(e.target.value);
    }

    const CheckLogin = () => {
        if (id === realId) {
            if (pw === realPw) {
                onClose();
            }
        } else {
            alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        }
    }
    
    return (
        <Container>
            <Header>
                <Title> 로그인 </Title>
                <Img 
                    src={cancel}
                    onClick={() => onClose()}
                />
            </Header>
            <Line/>
            <Body>
                <SubTitle> 아이디 </SubTitle>
                <InputForm 
                    type="text"
                    placeholder="본인 팀의 팀장 전화번호를 입력해주세요."
                    value={id}
                    onChange={onChamgeId}
                />
                <SubTitle> 비밀번호 </SubTitle>
                <InputForm 
                    type="password"
                    value={pw}
                    onChange={onChamgePw}
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

    color: ();
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
export default Login;