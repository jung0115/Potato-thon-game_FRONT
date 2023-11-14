import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import palette from "../../styles/colorPalatte";

import client from 'gamja-backend-client';

const TitleName = ['종목명', '현재가', '대비', '수량'];

const host = 'https://api.miruku.dog';

const CoinList = ({ onCoinClick }) => {
    const [isDetailOpen, setDetailOpen] = useState(false);  
    const [present, setPresent] = useState(new Date());
    const [token, setToken] = useState(null);
    const [coins, setCoins] = useState([]);
    const [priceDiffs, setPriceDiffs] = useState({});

    const CoinClick = (item) => {
        setDetailOpen(true);
        onCoinClick(item.name + " 코인");
    }
    
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

    const getCoins = async () => {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
            setCoins(response.coins);
        });
    }

    const coinHistories = async (coinId) => {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setMinutes(currentDate.getMinutes() - 10);

        await client.functional.coin.price_histories.getPriceHistories(
            getConnection(),
            coinId,
            {
                from: pastDate.toString(),
                to: currentDate.toString()
            }
        ).then(response => {
            const historyPrice = response.histories;
            console.log(historyPrice);
            
            // 가격 대비 세팅
            if (historyPrice.length >= 2) {
                const previousPrice = historyPrice[historyPrice.length - 2].price;
                const currentPrice = historyPrice[historyPrice.length - 1].price;

                setPriceDiffs((prev) => {
                    return {...prev, [coinId]: currentPrice - previousPrice };
                });
            }
        });
    }

    
    // 최초 접속 시, 코인 리스트 가져오기
    useEffect(() => {
        getCoins();
    }, []);

    // 코인 리스트 가져오면 코인별 가격, 대비 등 데이터 가져오기
    useEffect(() => {
        coins.forEach(coin => {
            coinHistories(coin.id);
        });
    }, [coins]);

    // 1분마다 체크 ---------------------------------------------------------------------------------------------------------
    //setInterval(setTime, 60000);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // 1초마다 현재 시간을 업데이트
        const interval = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // 1분마다 코인 증감 데이터 조회 api 호출
        // 너무 자주 api 호출하면 fetch 오류 발생
        const currentSecond = currentTime.getSeconds();
        if(currentSecond == 0) {
            coins.forEach(coin => {
                coinHistories(coin.id);
            });
        } 
        
    }, [currentTime]);

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
                <Line style={{ 
                    margin: '10px 10px 0 10px',
                    backgroundColor: '#BBBBBB'
                }} />
                <CoinInfoContent>
                    {coins.map((item, idx) => {
                        const presentPrice = (item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        const priceDiff = priceDiffs[item.id] || 0;
                        
                        return (
                            <CoinInfoSubContent onClick={() => CoinClick(item)}>
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
                                    {item.amount} 
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
    background-color: ${palette.bg_color};
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
    display: flex;
    overflow: hidden;
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
const Line = styled.div`
    background-color: ${palette.header_btm_line};
    height: 0.85px;
    margin-top: 10px;
`;
const CoinInfoSubContent = styled.div`
    display: flex;
    flex-direction: row;
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

    font-size: 14.6px;
    font-family: 'Pretendard-Bold';
    color: ${(props) => props.fontColor > 0 ?
        '#AA1919' : props.fontColor < 0 ? 
        '#1F27D7' : '#666666'
    };
`;

export default CoinList;