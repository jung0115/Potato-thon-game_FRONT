import styled from "styled-components";

import cancel from '../contents/cancel.svg';

const Login = (props) => {
    const id = '01000000000';
    const pw = 'pwpw1';
    
    return (
        <Container>
            <Header>
                <Title> 로그인 </Title>
                <Img src={cancel}/>
            </Header>
            <Line/>
            <Body>
                <SubTitle> 아이디 </SubTitle>
                <InputForm/>
                <SubTitle> 비밀번호 </SubTitle>
                <InputForm type="password"/>
            </Body>
            <LoginBtn> 로그인 </LoginBtn>
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
export default Login;