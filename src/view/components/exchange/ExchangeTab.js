// 거래소 탭
import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import StockChart from "./StockChart";
import CoinList from './CoinList';
import BuyingSelling from "./BuyingSelling";
import Question from "./Question";
import DetailCoinList from "./DetailCoinList";
import ExchangeTabModel from "../../../model/exchange/ExchangeTabModel";

// 메인 > 거래소 탭
const ExchangeTab = () => {
  const { selectedCoin, 
    setSelectedCoin,
    coinId, 
    remainAmount, 
    currentPrice, 
    cookies,
    coinGetCoins, 
    getCoinPrice 
  } = ExchangeTabModel();
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