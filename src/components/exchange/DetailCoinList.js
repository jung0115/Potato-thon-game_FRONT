import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TitleNmae = ['시간', '현재가', '대비', '잔량'];
const Coin = [
    {
        time: '14:10:00',
        purchasingPrice: 810,
        contrast: '▲ 23',
        remain: 3,
    },
    {
        time: '14:20:00',
        purchasingPrice: 810,
        contrast: '▲ 23',
        remain: 10,
    },
    {
        time: '14:30:00',
        purchasingPrice: 810,
        contrast: '▲ 23',
        remain: 20,
    },
    {
        time: '14:40:00',
        purchasingPrice: 810,
        contrast: '▲ 23',
        remain: 32,
    },
];

const DetailCoinList = ({ coinName }) => {
    return (
        <Container>
            <Title> {coinName} </Title>
            <Line />
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleNmae.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line style={{ margin: '10px 10px 0 10px' }} />
                <CoinInfoContent>
                    {Coin.map((item, idx) => {
                        const purchasinPrice = (item.purchasingPrice).toFixed(2).toLocaleString();
                        return (
                            <CoinInfoSubContent>
                                <SubContent> {item.time} </SubContent>
                                <SubContent style={{ marginLeft: '20px' }}> {purchasinPrice} </SubContent>
                                <SubContent style={{ marginLeft: '15px' }}> {item.contrast} </SubContent>
                                <SubContent style={{ marginLeft: '15px', marginRight: '8px' }}> {item.remain} </SubContent>  
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
    justify-content: space-around;
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
    justify-content: space-between;
    margin-left: 10px;
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

export default DetailCoinList;