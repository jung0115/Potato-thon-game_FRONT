// 주식 차트
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

const StockChart = () => {
  // 코인별 색상
  const coins = [{"name": "마이쮸", "color": palette.myjju}, {"name": "칙촉", "color": palette.chickchock}, {"name": "포카칩", "color": palette.pocachip},
  {"name": "오감자", "color": palette.ohgamja}, {"name": "꼬깔콘", "color": palette.ggoggalcorn}];

  const [is10Minute, set10Minute] = useState(true);  // 10분 단위 선택 유무
  const [is30Minute, set30Minute] = useState(false); // 30분 단위 선택 유무
  const [is1Hour, set1Hour] = useState(false);       // 1시간 단위 선택 유무

  // 10분 단위 선택
  const onClick10m = () => {
    set10Minute(true);
    set30Minute(false);
    set1Hour(false);
  }

  // 20분 단위 선택
  const onClick30m = () => {
    set10Minute(false);
    set30Minute(true);
    set1Hour(false);
  }

  // 30분 단위 선택
  const onClick1h = () => {
    set10Minute(false);
    set30Minute(false);
    set1Hour(true);
  }

  return(
    <Container>
      {/* 차트 상단 부분: 시간 간격 선택, 코인 차트별 색상 */}
      <ChartHeader>
        {/* 시간 간격 선택 */}
        <TimeContainer>
          <TimeTitle>Time</TimeTitle>

          <TimeBtns>
            {/* 10분 단위 */}
            {is10Minute ?
              <SelectTimeBtn onClick={onClick10m}>10m</SelectTimeBtn>
              :
              <UnselectTimeBtn onClick={onClick10m}>10m</UnselectTimeBtn>
            }
            <TimeLine/>
            {/* 30분 단위 */}
            {is30Minute ?
              <SelectTimeBtn onClick={onClick30m}>30m</SelectTimeBtn>
              :
              <UnselectTimeBtn onClick={onClick30m}>30m</UnselectTimeBtn>
            }
            <TimeLine/>
            {/* 1시간 단위 */}
            {is1Hour ?
              <SelectTimeBtn onClick={onClick1h}>1h</SelectTimeBtn>
              :
              <UnselectTimeBtn onClick={onClick1h}>1h</UnselectTimeBtn>
            }
          </TimeBtns>
        </TimeContainer>

        {/* 코인 차트 색상 표시 */}
        <CoinColorContainer>
          {coins.map((coin, idx) => (
            <CoinColor key={idx}>
              <CoinColorBox
                style={{ backgroundColor: coin.color }}/>
              <CointTag>{coin.name} 코인</CointTag>
            </CoinColor>
          ))}
        </CoinColorContainer>

      </ChartHeader>

      {/* 코인 차트 그래프 */}

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.box_bg_color};
  padding: 37px 13px 33px 15px;
`;

// 그래프 상단 부분
const ChartHeader = styled.div`
  display: flex;
`;

// 시간 간격 선택
const TimeContainer = styled.div`
  display: flex;
  margin-left: 12px;
  align-items: center;
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
  display: flex;
  border: 1px solid ${palette.time_table_border};
`;
// 시간 - 선택됨
const SelectTimeBtn = styled.div`
  display: flex;
  width: 98px;
  height: 70px;
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.time_table_number};
  background-color: ${palette.time_table_back};
  justify-content: center;
  align-items: center;
`;
// 시간 - 선택 안 됨
const UnselectTimeBtn = styled.div`
  display: flex;
  width: 98px;
  height: 70px;
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  color: ${palette.time_table_number};
  justify-content: center;
  align-items: center;
`;
// 시간 버튼 구분선
const TimeLine = styled.div`
  width: 1px;
  height: auto;
  margin: 9px 0px;
  background-color: ${palette.time_table_border};
`;

// 코인 차트 색상 표시
const CoinColorContainer = styled.div`
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  width: 440px;
  margin-left: auto;
  margin-top: 33px;
`;
// 코인 낱개
const CoinColor = styled.div`
  width: 142px;
  display: flex;
  align-items: center;
`;
// 색상 박스
const CoinColorBox = styled.div`
  width: 36px;
  height: 12px;
  margin-left: 17px;
  margin-right: 10px;
`;
// 코인 이름
const CointTag = styled.div`
  font-size: 16.5px;
  font-family: 'Pretendard-Regular';
  color: ${palette.coin_color_tag};
`;

export default StockChart;