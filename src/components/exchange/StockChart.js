// 주식 차트
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import client from 'gamja-backend-client';

// 격자 크기
const gridSize = 88;

const StockChart = () => {
  const host = 'https://api.miruku.dog';
  const getConnection = () => {
    return {
      host: host,
      headers: {
      }
    }
  }
  async function user() {
    await client.functional.user.register(
      getConnection(),
      {
        id: '010-0987-1234',
        password: 'test1234'
      }
    )
  }
  async function auth() {
    // Sign in
    await client.functional.auth.signIn(
        getConnection(),
        {
            id: '010-0987-1234', // ID
            password: 'test1234' // Password
        }
    ).then(response => {
        //response.token // JWT token
        console.log(response.token);

        //setToken(response.token);
    });
  }
  //auth();
  //user();

  const graphWidth = 500;
  
  // 차트 데이터 샘플
  const coinDatas = [[2000, 1000, 2000, 1200, 3000, 2400, 2764, 2182, 1629, 1000, 1100, 1238, 2826],
    [2100, 900, 2030, 1510, 2300, 2510, 804, 1452, 1429, 1030, 1110, 1263, 1826],
    [500, 1000, 1500, 2000, 2500, 3000, 2500, 2000, 1500, 1000, 500, 1000, 1500],
    [1900, 1300, 1523, 1342, 920, 2512, 1000, 1472, 2451, 2030, 1610, 1293, 1836],
    [1300, 2300, 2340, 1242, 1242, 2553, 1425, 525, 731, 1999, 1340, 1253, 1264],
    [800, 1040, 1010, 1610, 2230, 2140, 1222, 1232, 899, 1652, 1610, 1223, 1562]];
  //console.log(Math.sqrt(Math.pow(gridSize + 1, 2) + Math.pow(coinDatas.ohyes[0] - coinDatas.ohyes[1], 2)));

  // 가로 너비
  const minWidth = (gridSize * 9.5) + 10;
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

  // 코인차트 선택
  const [selectCoin, setSelectCoin] = useState(null);
  
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

  // 코인 그래프 선택
  const onClickCoin = (index) => {
    // 선택했던 걸 재선택하면 선택 취소
    if(index == selectCoin) {
      setSelectCoin(null);
    }
    // 아닐 경우 선택
    else {
      setSelectCoin(index);
    }
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

    let index = 0;
    for(let i = (chartWidth - gridSize/2 - 1) / (gridSize + 1); i >= 1; i--) {
      index++;

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
          {/* 수직 격자선 */}
          <GridVerticalContents>
            <GridVerticalLine/>
            <GridVerticalRange/>
            <GridVerticalRangeText>{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}</GridVerticalRangeText>
          </GridVerticalContents>

          {/* 꺾은선 그래프 */}
          {/* 선택된 코인이거나, 아무 코인도 선택되지 않은 경우에만 보여줄 것 */}
          <GraphLines>
            {coinDatas.map((coinData, idx) => (
              selectCoin == idx || selectCoin == null ?
              <GraphLine
                style={{
                marginTop: getGraphHeight(coinData[index]),
                width: getGraphLineSize(coinData[index], coinData[index + 1]),
                transform: `rotate(${getGraphLineDegree(coinData[index], coinData[index + 1])}deg)`,
                backgroundColor: Object.values(coins[idx])[1]}}
                onClick={() => onClickCoin(idx)}/>
                : null
            ))}
          </GraphLines>
        </GridVertical>
      );
    }

    return lines;
  }

  // 그래프 높이(?) 계산
  // 현재 코인값을 그래프 길이에 비례해서...
  const getGraphHeight = (cost1) => {
    const top = 3000 - cost1;
    return top / 500 * (gridSize + 1);
  }

  // 그래프 꺾은 선 길이 계산
  const getGraphLineSize = (cost1, cost2) => {
    const graphHeight = Math.abs(cost1 - cost2);
    const size = Math.sqrt(Math.pow(graphWidth, 2) + Math.pow(graphHeight, 2));
    return size / 500 * (gridSize + 1);
  }

  // 그래프 꺾은 선 각도 계산
  const getGraphLineDegree = (cost1, cost2) => {
    const graphHeight = Math.abs(cost1 - cost2);
    const degree = Math.atan(graphHeight / graphWidth) * 180 / Math.PI;
    return degree * Math.sign(cost1 - cost2);
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
            <CoinColor
              key={idx}
              onClick={() => onClickCoin(idx)}>
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

        {/* 그래프 꺾은선 */}
        <GraphLineContainer>
          {/* 맨 왼쪽 반쪽짜리 선 */}
          {/* 선택된 코인이거나, 아무 코인도 선택되지 않은 경우에만 보여줄 것 */}
          {coinDatas.map((coinData, idx) => (
            selectCoin == idx || selectCoin == null ?
            <GraphStartLine
              style={{
                marginTop: getGraphHeight((coinData[0] + coinData[1]) / 2),
                width: getGraphLineSize(coinData[0], coinData[1]) / 2,
                transform: `rotate(${getGraphLineDegree(coinData[0], coinData[1])}deg)`,
                backgroundColor: Object.values(coins[idx])[1]}}
              onClick={() => onClickCoin(idx)}/>
            : null
          ))}
          {/* 나머지 선은 수직 격자에 겹쳐서*/}
        </GraphLineContainer>

      </GridContainer>
    </Container>
  );
}

const Container = styled.div`
  display: block;
  height: auto;
  background-color: ${palette.box_bg_color};
  padding: 37px 13px 27px 15px;
`;

// 그래프 상단 부분 -----------------------------------------------------------------------
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
  cursor: pointer;
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
  cursor: pointer;
`;
// 시간 버튼 구분선
const TimeLine = styled.div`
  width: 1px;
  height: auto;
  margin: 9px 0px;
  background-color: ${palette.time_table_border};
`;

// 코인 차트 색상 표시 -----------------------------------------------------------------------
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
  cursor: pointer;
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

// 격자 ---------------------------------------------------------------------------------------------
const GridContainer = styled.div`
  margin: 40px 15px 0px 10px;
  width: auto;
  height: auto;
  position: relative;
`;
const GridHorizonContainer = styled.div`
  width: auto;
  height: auto;
`;
const GridVerticalContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
`;
const GridHorizon = styled.div`
  width: auto;
  height: auto;
  display: flex;
`;
const GridVertical = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: ${gridSize / 2}px;
  position: relative;
`;
const GridVerticalContents = styled.div`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
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

// 격자 세로선 범위 -----------------------------------------------------------------------
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

// 격자 가로선 범위 -----------------------------------------------------------------------
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

// 꺾은선 그래프 -----------------------------------------------------------------------
const GraphLineContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: ${gridSize / 2}px;
`;
const GraphStartLine = styled.div`
  height: 3px;
  transform-origin: top left;
  position: absolute;
  left: 0;
  z-index: 10;
  border-radius: 10px;
  cursor: pointer;
`;
const GraphLines = styled.div`
  transform-origin: top left;
  position: absolute;
`;
const GraphLine = styled.div`
  height: 3px;
  transform-origin: top left;
  position: absolute;
  margin-left: ${gridSize / 2 + 0.5}px;
  z-index: 10;
  border-radius: 10px;
  cursor: pointer;
`;

export default StockChart;