import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TitleName = ['종목명', '현재가', '대비', '수량'];

const Coin = [
    {
        name: '마이쮸 코인',
        price: 810,
        contrast: '▲ 23',
        quantity: 3,
    },
    {
        name: '칙촉 코인',
        price: 1295,
        contrast: '▼ 125',
        quantity: 10,
    },
    {
        name: '포카칩 코인',
        price: 1920,
        contrast: '▲ 105',
        quantity: 29,
    },
    {
        name: '오감자 코인',
        price: 1410,
        contrast: '▲ 40',
        quantity: 5,
    },
    {
        name: '꼬깔콘 코인',
        price: 1502,
        contrast: '▲ 9',
        quantity: 12,
    },
];

const CoinList = ({ onCoinClick }) => {
    return (
        <Container>
            <Title> 전체 코인 </Title>
            <Line 
                style={{ 
                    width: '516px',
                    marginTop: 'auto'
                }}
            />
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleName.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line />
                <CoinInfoContent>
                    {Coin.map((item, idx) => {
                        const presentPrice = (item.price).toFixed(2).toLocaleString();
                        return (
                            <CoinInfoSubContent onClick={() => onCoinClick(item.name)}>
                                <SubContent> {item.name} </SubContent>
                                    <SubContent style={{ marginLeft: '20px' }}> 
                                        {presentPrice} 
                                    </SubContent>
                                    <SubContent style={{ marginLeft: '10px' }}> 
                                        {item.contrast} 
                                    </SubContent>
                                    <SubContent style={{ marginLeft: '5px' }}> 
                                        {item.quantity} 
                                    </SubContent>  
                            </CoinInfoSubContent>      
                        )
                    })}
                </CoinInfoContent>
            </CoinInfo>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    float: right;
`;
const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #FAEBD5;
`;
const CoinInfo = styled.div`
    width: 516px;
    height: 377px;
    border-radius: 20px;
    background-color: #E6E6E6;
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
`;
const CoinInfoTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
const SubTitle = styled.p`
    display: flex;
    margin: 25px 45px 10px 45px;
    font-size: 18px;
    color: #666666;
`;
const CoinInfoContent = styled.div`
    height: 290px;
    margin-top: 23px;
    overflow: scroll;
`;
const Line = styled.hr`
    width: 480px;
    display: flex;
    color: #666666;
`;
const CoinInfoSubContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10px;
  text-decoration: none;
  cursor: pointer;
`;
const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    text-align: center;
    flex: 1;

    font-size: 16px;
    font-weight: bold;
    color: #666666;
`;

export default CoinList;