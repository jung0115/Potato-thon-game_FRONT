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
  
`;
const BuySellLabel = styled.div`

`;

export default BuyingSelling;