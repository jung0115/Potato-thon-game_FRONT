import React from 'react';
import { useEffect, useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    float: right;
`;

const Title = styled.p`
    font-size: 25px;
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
`;

const SubTitle = styled.p`
    display: flex;
    margin: 25px 45px;
    font-size: 18px;
    color: #666666;
`;

const CoinInfoContent = styled.div`
    height: 250px;
    display: flex;
    flex-direction: row;
    overflow: scroll;
    align-content: space-around;
`;

const Line = styled.hr`
    width: 499px;
    display: flex;
    color: #666666;
`;

const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 33px;
    text-align: center;
    justify-content: space-between;
    cursor: pointer;

    font-size: 16px;
    font-weight: bold;
    color: #666666;
`;

const TitleNmae = ['종목명', '현재가', '대비', '수량'];
const Coin = [
    {
        name: '마이쮸 코인',
        price: '810.00',
        contrast: '▲ 23',
        quantity: 3,
    },
    {
        name: '칙촉 코인',
        price: '1,295.00',
        contrast: '▼ 125',
        quantity: 10,
    },
    {
        name: '포카칩 코인',
        price: '1,920.00',
        contrast: '▲ 105',
        quantity: 29,
    },
    {
        name: '오감자 코인',
        price: '1,410.00',
        contrast: '▲ 40',
        quantity: 5,
    },
    {
        name: '꼬깔콘 코인',
        price: '1,502.00',
        contrast: '▲ 9',
        quantity: 12,
    },
];

const CoinList = () => {
    const [title, setTitle] = useState("전체 코인");

    return (
        <Container>
            <Title> {title} </Title>
            <CoinInfo>
                <CoinInfoTitle>
                    {TitleNmae.map(item => (
                        <SubTitle> {item} </SubTitle>
                    ))}
                </CoinInfoTitle>
                <Line />
                <CoinInfoContent>
                    <SubContent>
                        {Coin.map(item => (
                            <div onClick={() => setTitle(item.name)}> {item.name} </div>
                        ))}
                    </SubContent>
                    <SubContent>
                        {Coin.map(item => (
                            <div> {item.price} </div>
                        ))}
                    </SubContent>
                    <SubContent>
                        {Coin.map(item => (
                            <div style={{marginLeft: '20px'}}> 
                                {item.contrast} 
                            </div>
                        ))}
                    </SubContent>
                    <SubContent>
                        {Coin.map(item => (
                            <div style={{marginLeft: '35px'}}> 
                                {item.quantity} 
                            </div>
                        ))}
                    </SubContent>
                </CoinInfoContent>
            </CoinInfo>
        </Container>
    );
}

export default CoinList;