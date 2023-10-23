// 거래소 탭
import React from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import StockChart from "./StockChart";
import CoinList from './CoinList';
import BuyingSelling from "./BuyingSelling";

// 메인 > 거래소 탭
const ExchangeTab = () => {
  return(
    <Container>
      {/*<Title>실시간 주식 차트</Title>*/}

      <Contents>
        {/* 좌측 components */}
        <LeftContainter>
          {/* 주식 차트 */}
          <StockChart/>

        </LeftContainter>

        {/* 우측 component */}
        <RightContainter>
          {/* 전체 코인 or 선택한 코인 */}
          {/*<CoinList/>*/}

          {/* 도움말 */}
          <BuyingSelling/>

          {/* 매수/매도 */}
          

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
  padding: 21px 21px 10px 12px;
`;

// 좌측 내용: 주식 차트
const LeftContainter = styled.div`
  flex: 2.2;
  margin-right: 13px;
`;

// 우측 내용: 코인 등락 정보, 도움말, 매수/매도
const RightContainter = styled.div`
  flex: 1;
`;

export default ExchangeTab;