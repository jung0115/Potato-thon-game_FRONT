// 주식 차트
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

//import client from "gamja-backend-client";

// 격자 크기
const gridSize = 88;

const StockChart = () => {
  // 가로 너비
  const minWidth = (gridSize * 9.5) + 9;
  const [chartWidth, setChartWidth] = useState(Math.max(minWidth, Math.round(window.innerWidth / 3.5 * 2.5 / (gridSize + 1)) * (gridSize + 1) - (gridSize * 2.5 + 2)));

  // 코인별 색상
  const coins = [{"name": "오예스 미니", "color": palette.ohyes}, {"name": "하리보", "color": palette.haribo}, {"name": "칙촉", "color": palette.chikchok},
  {"name": "트윅스 미니스", "color": palette.twix}, {"name": "오리온 카스타드", "color": palette.castad}, {"name": "ABC 초콜릿", "color": palette.abcchoco}];

  // 시간
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const [is10Minute, set10Minute] = useState(true);  // 10분 단위 선택 유무
  const [is30Minute, set30Minute] = useState(false); // 30분 단위 선택 유무
  const [is1Hour, set1Hour] = useState(false);       // 1시간 단위 선택 
  
  // 현재 시간 가져오기
  const setTime = () => {
    const date = new Date();
    let presentHour = date.getHours();
    let presentMinute = date.getMinutes();

    // 10분 단위
    if(is10Minute) {
      presentMinute -= presentMinute % 10;
    }
    // 30분 단위
    else if(is30Minute) {
      if(presentMinute >= 30) presentMinute = 30;
      else presentMinute = 0;
    }
    // 1시간 단위
    else if(is1Hour) {
      presentMinute = 0;
    }

    setHour(presentHour);
    setMinute(presentMinute);
  }

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

  // 화면 크기 변할 때마다 가로길이 가져오기
  const handleResize = () => {
    let newWidth = Math.round(window.innerWidth / 3.5 * 2.5 / (gridSize + 1)) * (gridSize + 1) - (gridSize * 2.5 + 2);
    setChartWidth(Math.max(newWidth, minWidth));
  };

  // 가로선 삽입
  const setHorizonLines = () => {
    let lines = [];

    for(let i = 3000; i > 500; i -= 500) {
      lines.push(
        <GridHorizon>
          <GridHorizonLine style={{width: chartWidth}}/>
          <GridHorizonRange/>
          <GridHorizonRangeText>{i}.00</GridHorizonRangeText>
        </GridHorizon>
      );
    }

    return lines;
  }

  // 세로선 삽입
  const setVerticalLines = () => {
    let lines = [];

    for(let i = (chartWidth - gridSize/2) / (gridSize + 1); i >= 1; i--) {
      let h = hour;
      let m = minute;

      // 10분 단위
      if(is10Minute) {
        m -= 10 * i;
        
        if(m < 0) {
          m *= -1;
          h -= Math.floor(m/60) + 1;
          m = (60 - (m % 60)) % 60;
        }
        else {
          h -= Math.floor(m/60);
          m %= 60;
        }
      }
      // 30분 단위
      else if(is30Minute) {
        m -= 30 * i;

        if(m < 0) {
          m *= -1;
          h -= Math.floor(m/60) + 1;
          m %= 60;
        }
        h -= Math.floor(m/60);
        m %= 60;
      }
      // 40분 단위
      else if(is1Hour) {
        m = 0;
        h = (h - i) % 24;
      }

      if(h <= 0) {
        h = (24 + h) % 24;
      }

      lines.push(
        <GridVertical>
          <GridVerticalLine/>
          <GridVerticalRange/>
          <GridVerticalRangeText>{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}</GridVerticalRangeText>
        </GridVertical>
      );
    }

    return lines;
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  setInterval(setTime, 10000);

  useEffect(() => {
    setTime();
  }, [minute, is10Minute, is30Minute, is1Hour]);

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
      {/* 그래프 격자 */}
      <GridContainer>
        {/* 가로선 */}
        <GridHorizonContainer>
          {setHorizonLines()}

          {/* 가격 단위 */}
          <GridHorizon>
            <GridHorizonEnd style={{width: chartWidth}}/>
            <GridHorizonRange/>
            <GridHorizonRangeText>500.00</GridHorizonRangeText>
          </GridHorizon>
        </GridHorizonContainer>

        {/* 세로선 */}
        <GridVerticalContainer>
          {setVerticalLines()}
          
          {/* 시간 단위 */}
          <GridVertical>
            <GridVerticalEnd/>
            <GridVerticalRangeEnd/>
            <GridVerticalRangeEndText>{String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}</GridVerticalRangeEndText>
          </GridVertical>
        </GridVerticalContainer>
      </GridContainer>

      {/* 그래프 꺾은선 */}
      
    </Container>
  );
}

const Container = styled.div`
  display: block;
  height: auto;
  background-color: ${palette.box_bg_color};
  padding: 37px 13px 27px 15px;
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
  justify-content: center;
  flex-wrap: wrap;
  width: 600px;
  margin: 12px 0px 12px auto;
`;
// 코인 낱개
const CoinColor = styled.div`
  width: 200px;
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

// 격자
const GridContainer = styled.div`
  margin: 40px 15px 0px 10px;
  width: auto;
  height: auto;
  position: relative;
`;
const GridHorizonContainer = styled.div`
  width: auto;
  height: auto;
  margin-left: auto;
`;
const GridVerticalContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  margin-left: auto;
  position: absolute;
  left: 0;
  top: 0;
`;
const GridHorizon = styled.div`
  width: auto;
  height: auto;
  display: flex;
  margin-left: auto;
`;
const GridVertical = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: ${gridSize / 2}px;
`;
// 격자 세로선
const GridVerticalLine = styled.div`
  width: 1px;
  height: ${(gridSize + 1) * 5}px;
  background-color: ${palette.grid_line};
  margin: 0px ${gridSize / 2}px;
`;
// 격자 가로선
const GridHorizonLine = styled.div`
  height: 1px;
  background-color: ${palette.grid_line};
  margin: ${gridSize / 2}px 0px;
`;
// 격자 세로선 끝
const GridVerticalEnd = styled.div`
  width: 1px;
  height: ${(gridSize + 1) * 5}px;
  background-color: ${palette.grid_end_line};
  margin-left: ${gridSize / 2}px;
  margin-right: 105px;
`;
// 격자 가로선 끝
const GridHorizonEnd = styled.div`
  height: 1px;
  background-color: ${palette.grid_end_line};
  margin: ${gridSize / 2}px 0px;
`;
// 격자 세로선 범위
const GridVerticalRange = styled.div`
  width: 2px;
  height: 16px;
  background-color: ${palette.grid_end_line};
  margin: 0px auto;
`;
const GridVerticalRangeEnd = styled.div`
  width: 2px;
  height: 16px;
  background-color: ${palette.grid_end_line};
  margin-left: auto;
  margin-right: 104.5px;
`;
const GridVerticalRangeText = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  color: ${palette.grid_range};
  margin: 9px auto 0px auto;
`;
const GridVerticalRangeEndText = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  color: ${palette.grid_range};
  margin: 9px 84.5px 0px auto;
`;

// 격자 가로선 범위
const GridHorizonRange = styled.div`
  height: 2px;
  width: 16px;
  background-color: ${palette.grid_end_line};
  margin-top: ${gridSize / 2}px;
`;
const GridHorizonRangeText = styled.div`
  width: 80px;
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  color: ${palette.grid_range};
  margin: auto 0px auto 9px;
`;


export default StockChart;