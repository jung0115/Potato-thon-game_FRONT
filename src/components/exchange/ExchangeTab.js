// 거래소 탭
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import StockChart from "./StockChart";
import CoinList from './CoinList';
import BuyingSelling from "./BuyingSelling";
import Question from "./Question";
import DetailCoinList from "./DetailCoinList";

import client from 'gamja-backend-client';

// api BASE URL
const host = 'https://api.miruku.dog';

// 메인 > 거래소 탭
const ExchangeTab = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  //const [coinDatas, setCoinDatas] = useState([]);

  
  const [cookies] = useCookies(['token']);

  const [coinId, setCoinId] = useState(null);
  const [remainAmount, setRemainAmount] = useState(0); // 잔여 코인 
  const [currentPrice, setCurrentPrice] = useState(0); // 현재 가격
  

  const getConnection = () => {
    return {
      host: host,
      headers: {
        ...cookies.token ? {
          'Authorization': `Bearer ${cookies.token}`
        } : null
      }
    }
  }

  // 코인 종류 조회 ---------------------------------------------------------------------------------------------------------
  // 코인 id, 잔여 개수 조회
  async function coinGetCoins() {
    await client.functional.coin.getCoins(
      getConnection()
    ).then(response => {
      //console.log(response.coins);
      setCoinId(null);
      setRemainAmount(0);
      const coinNameSub = selectedCoin.substr(0, selectedCoin.length - 3);
      //console.log(coinNameSub);
      for(let i = 0; i < response.coins.length; i++) {
        if(response.coins[i].name == coinNameSub) {
          setCoinId(response.coins[i].id);
          setRemainAmount(Number(response.coins[i].amount));
        }
      }
    })
  }

  // 현재 코인 가격
  async function getCoinPrice() {
    if(coinId != null) {
      const currentDate = new Date(); // 현재 시간
      const pastDate = new Date();
      pastDate.setMinutes(currentDate.getMinutes() - 1);

      await client.functional.coin.price_histories.getPriceHistories(
        getConnection(),
        coinId, // Coin ID
        {
          from: pastDate.toString(), // From
          to: currentDate.toString() // To
        }
      ).then(response => {
        //console.log(response.histories);
        setCurrentPrice(response.histories[0].price);
        //console.log(currentPrice);
      });
    }
  }

  useEffect(() => {
    console.log(selectedCoin);
    if(selectedCoin != null) coinGetCoins();
    //console.log(selectedCoin);
  }, [selectedCoin]);

  useEffect(() => {
    //console.log(coinId);
    //console.log(remainAmount);
    getCoinPrice();
  }, [coinId, remainAmount]);

  useEffect(() => {
    //console.log(currentPrice);
  }, [currentPrice]);

  return(
    <Container>
      {/*<Title>실시간 주식 차트</Title>*/}

      <Contents>
        {/* 좌측 components */}
        <LeftContainter>
          {/* 주식 차트 */}
          <StockChart
            onCoinClick={(coinName) => setSelectedCoin(coinName)}
            coinName={selectedCoin} 
          />

        </LeftContainter>

        {/* 우측 component */}
        <RightContainter>
          {/* 전체 코인 or 선택한 코인 */}
          {selectedCoin ? (
            <DetailCoinList 
              onClose={() => setSelectedCoin(null)}
              coinName={selectedCoin}/>
          ) : (
            <CoinList
              onCoinClick={(coinName) => setSelectedCoin(coinName)}  
            />
          )}

          {/* 도움말 or 매수/매도 */}
          {selectedCoin && (cookies.token != null) ? 
            <BuyingSelling
              onClose={() => setSelectedCoin(null)}
              _coinId={coinId}
              _remainAmount={remainAmount}
              _currentPrice={currentPrice}/>
            :
            <Question/>
          }

        </RightContainter>

      </Contents>

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.bg_color};
`;

// 제목: 실시간 주식 차트
const Title = styled.div`
  font-size: 23px;
  font-family: 'Pretendard-Bold';
  color: ${palette.sub_title};
  margin: 44px 0px 20px 41px;
`;

// 내용
const Contents = styled.div`
  display: flex;
  padding: 13px 21px 10px 12px;
`;

// 좌측 내용: 주식 차트
const LeftContainter = styled.div`
  flex: 2.5;
  margin-right: 13px;
`;

// 우측 내용: 코인 등락 정보, 도움말, 매수/매도
const RightContainter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default ExchangeTab;