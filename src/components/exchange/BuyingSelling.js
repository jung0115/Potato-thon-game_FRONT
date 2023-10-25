// 매수/매도
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

const BuyingSelling = () => {
  return(
    <Container>
      <Title>매수/매도</Title>

      <Contents>
        {/* 매수, 매도 선택 탭 */}
        <TabContainer>
          <SelectTab>매수</SelectTab>
          <UnselectRightTab>매도</UnselectRightTab>
        </TabContainer>

        {/* 매수 */}
        <BuySellContainer>
          {/* 매수 가능 */}
          <BuySellContent>
            <BuySellLabel>매수 가능</BuySellLabel>

            <BuySellValues>
              <BuySellNumber>29</BuySellNumber>
              <BuySellMeasure>coin</BuySellMeasure>
            </BuySellValues>
          </BuySellContent>

          {/* 1 coin당 가격 */}
          <BuySellContent>
            <BuySellLabel>1 coin 당</BuySellLabel>

            <BuySellValues>
              <BuySellNumber>1,920</BuySellNumber>
              <BuySellMeasure>원</BuySellMeasure>
            </BuySellValues>
          </BuySellContent>

          {/* 매수 수량 */}

          {/* 매수 금액 */}

          {/* 주문하기 버튼 */}


        </BuySellContainer>

        {/* 매도 */}

      </Contents>

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.box_bg_color};
  margin-top: 13px;
  padding: 11px 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.sub_title};
  padding-bottom: 12px;
  padding-left: 2px;
`;

const Contents = styled.div`
  background-color: ${palette.buy_sell_box};
  border-radius: 8px;
`;

// 매수, 매도 선택 탭
const TabContainer = styled.div`
  display: flex;
  width: auto;
`;
const SelectTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  color: ${palette.select_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
`;
const UnselectRightTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  background-color: ${palette.unselect_buy_sell_bg};
  color: ${palette.unselect_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  border-radius: 0px 8px 0px 0px;
`;
const UnselectLeftTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  background-color: ${palette.unselect_buy_sell_bg};
  color: ${palette.unselect_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  border-radius: 0px 0px 0px 8px;
`;

const BuySellContainer = styled.div`
  padding: 16px 20px 10px 20px;
`;
const BuySellContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  margin-bottom: 16px;
`;
const BuySellLabel = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
`;
const BuySellValues = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
const BuySellNumber = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
`;
const BuySellMeasure = styled.div`
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  color: ${palette.buy_sell_measure};
  margin-left: 6px;
`;

export default BuyingSelling;