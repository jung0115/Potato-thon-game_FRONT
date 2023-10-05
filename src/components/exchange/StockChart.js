// 주식 차트
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

const StockChart = () => {
  return(
    <Container>
      {/* 차트 상단 부분: 시간 간격 선택, 코인 차트별 색상 */}
      <ChartHeader>
        {/* 시간 간격 선택 */}
        <SelectTime>
          <TimeTitle>Time</TimeTitle>

        </SelectTime>

        {/* 코인 차트 색상 표시 */}

      </ChartHeader>

      {/* 코인 차트 그래프 */}

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.box_bg_color};
  padding: 37px 17px 33px 15px;
`;

// 그래프 상단 부분
const ChartHeader = styled.div`
  display: flex;
`;

// 시간 간격 선택
const SelectTime = styled.div`
  display: flex;
  margin-top: 37px;
  margin-left: 27px;
  justify-items: center;
`;
// time
const TimeTitle = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.time_title};
  margin-right: 21px;
`;
// 시간 선택창
const TimeBtns = styled.div`
  
`;


export default StockChart;