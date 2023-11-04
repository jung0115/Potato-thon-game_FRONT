import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TitleName = ['종목명', '현재가', '대비', '수량'];

const Coin = [
    {
        name: '마이쮸 코인',
        price: 810,
        previousPrice: 790,
        quantity: 3,
    },
    {
        name: '칙촉 코인',
        price: 1295,
        previousPrice: 1295,
        quantity: 10,
    },
    {
        name: '포카칩 코인',
        price: 1920,
        previousPrice: 790,
        quantity: 29,
    },
    {
        name: '오감자 코인',
        price: 1410,
        previousPrice: 1501,
        quantity: 5,
    },
    {
        name: '꼬깔콘 코인',
        price: 1502,
        previousPrice: 1490,
        quantity: 12,
    },
];

const CoinList = ({ onCoinClick }) => {
    return (
        <Container>
            <Title> 전체 코인 </Title>
            <Line />
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleName.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line style={{ margin: '10px 10px 0 10px' }} />
                <CoinInfoContent>
                    {Coin.map((item, idx) => {
                        const presentPrice = (item.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        const priceDiff = item.price - item.previousPrice;
                        
                        return (
                            <CoinInfoSubContent onClick={() => onCoinClick(item.name)}>
                                <SubContent> {item.name} </SubContent>
                                <SubContent 
                                    style={{ marginLeft: '20px' }}
                                    fontColor={priceDiff}
                                > 
                                    {presentPrice} 
                                </SubContent>
                                <SubContent 
                                    style={{ marginLeft: '10px' }}
                                    fontColor={priceDiff}
                                > 
                                    {priceDiff != 0 ? (
                                        <>
                                            {priceDiff > 0 ? '▲' : '▼'} {" "}
                                            {Math.abs(priceDiff).toLocaleString()} 
                                        </>) : ('-')
                                    } 
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
    display: block;
    flex-direction: column;
`;
const Title = styled.p`
    margin: 0 auto;
    font-size: 22px;
    font-family: 'Pretendard-Bold';
    color: #FAEBD5;
    margin-left: 4px;
`;
const CoinInfo = styled.div`
    display: block;
    flex-direction: column;
    margin-top: 15px;
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
    margin: 25px 35px 10px 35px;
    font-size: 16px;
    color: #666666;
    white-space: nowrap;
`;
const CoinInfoContent = styled.div`
    margin-top: 23px;
    overflow: scroll;
`;
const Line = styled.hr`
    height: 0.85px;
    margin-top: 10px;
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
    color: ${(props) => props.fontColor > 0 ?
        '#AA1919' : props.fontColor < 0 ? 
        '#1F27D7' : '#666666'
    };
`;

export default CoinList;