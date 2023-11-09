// 주식 차트
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import client from 'gamja-backend-client';

// UI에 보이는 격자 크기
const gridSize = 88;
// 실제 수치의 격자 크기 (가격 값)
const graphWidth = 500;

// api BASE URL
const host = 'https://api.miruku.dog';

const StockChart = ({ onCoinClick, coinName }) => {
  const [token, setToken] = useState(null);
  
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
  // 로그인 ---------------------------------------------------------------------------------------------------------
  async function authSignIn() {
    await client.functional.auth.signIn(
        getConnection(),
        {
          id: '010-0987-1234',
          password: 'test1234'
        }
    ).then(response => {
        //response.token // JWT token
        setToken(response.token);
        //console.log(response.token);
    });
  }
  //authSignIn();
  // 코인 종류 조회 ---------------------------------------------------------------------------------------------------------
  async function coinGetCoins() {
    await client.functional.coin.getCoins(
      getConnection()
    ).then(response => {
      console.log(response);
    })
  }
  // 코인 증감 기록 확인 ---------------------------------------------------------------------------------------------------------
  async function coinPriceHistories(coinId, currentDate, pastDate) {
    await client.functional.coin.price_histories.getPriceHistories(
      getConnection(),
      coinId, // Coin ID
      {
        from: pastDate.toString(), // From
        to: currentDate.toString() // To
      }
    ).then(response => {
      //console.log(response.histories);
      //console.log(new Date(response.histories[0].timestamp));
      setCoinHistoryDatas(coinId, response.histories);
    });
  }
  //coinPriceHistories();
  // coinGetCoins();

  // 데이터 ---------------------------------------------------------------------------------------------------------
  const [coinDatas, setCoinData] = useState({});
  //console.log(Math.sqrt(Math.pow(gridSize + 1, 2) + Math.pow(coinDatas.ohyes[0] - coinDatas.ohyes[1], 2)));
  // 가로 너비
  const minWidth = (gridSize * 9.5) + 10;
  const [chartWidth, setChartWidth] = useState(Math.max(minWidth, Math.round(window.innerWidth / 3.5 * 2.5 / (gridSize + 1)) * (gridSize + 1) - (gridSize * 2.5 + 2)));

  // 코인별 색상
  const coins = [{"name": "오예스 미니", "id": "ohyes", "color": palette.ohyes}, {"name": "하리보", "id": "haribo", "color": palette.haribo},
  {"name": "칙촉", "id": "chikchok", "color": palette.chikchok}, {"name": "트윅스 미니스", "id": "twix", "color": palette.twix},
  {"name": "오리온 카스타드", "id": "castad", "color": palette.castad}, {"name": "ABC 초콜릿", "id": "abcchoco", "color": palette.abcchoco}];

  // 시간
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const [is10Minute, set10Minute] = useState(true);  // 10분 단위 선택 유무
  const [is30Minute, set30Minute] = useState(false); // 30분 단위 선택 유무
  const [is1Hour, set1Hour] = useState(false);       // 1시간 단위 선택 

  // 코인차트 선택
  const [selectCoin, setSelectCoin] = useState(null);
  
  // 현재 시간 가져오기 ---------------------------------------------------------------------------------------------------------
  const setTime = () => {
    const currentDate = new Date(); // 현재 시간
    const pastDate = new Date(); // 그래프 시작 시간

    const subTime = (chartWidth - gridSize/2 - 1) / (gridSize + 1) + 1;

    let currentHour = currentDate.getHours();
    let currentMinute = currentDate.getMinutes();

    // 10분 단위
    if(is10Minute) {
      currentDate.setMinutes(currentMinute);
      pastDate.setMinutes(currentMinute - (subTime * 10) - 1); // 현재로부터 subTime * 10분 전
      // 코인 증감 데이터 세팅
      setCoinData({});
      for(let i = 0; i < coins.length; i++) {
        coinPriceHistories(coins[i].id, currentDate, pastDate);
      }
    }
    // 30분 단위
    else if(is30Minute) {
      currentDate.setMinutes(currentMinute);
      pastDate.setMinutes(currentMinute - (subTime * 30) - 1); // 현재로부터 subTime * 30분 전
      // 코인 증감 데이터 세팅
      setCoinData({});
      for(let i = 0; i < coins.length; i++) {
        coinPriceHistories(coins[i].id, currentDate, pastDate);
      }
    }
    // 1시간 단위
    else if(is1Hour) {
      currentDate.setMinutes(currentMinute);
      pastDate.setMinutes(currentMinute);
      pastDate.setHours(currentHour - subTime - 1); // 현재로부터 subTime시간 전
      // 코인 증감 데이터 세팅
      setCoinData({});
      for(let i = 0; i < coins.length; i++) {
        coinPriceHistories(coins[i].id, currentDate, pastDate);
      }
    }

    setHour(currentHour);
    setMinute(currentMinute);
  }

  // 코인 가격 데이터 정리 ---------------------------------------------------------------------------------------------------------
  const setCoinHistoryDatas = (coinId, histories) => {
    // 10분 단위
    if(is10Minute) {
      const data = [];
      for(let i = 0; i < histories.length; i += 10) {
        data.unshift(histories[i].price);
      }
      setCoinData((currentData) => {
        return {...currentData, [coinId]: data };
      });
    }

    // 30분 단위
    else if(is30Minute) {
      const data = [];
      for(let i = 0; i < histories.length; i += 30) {
        data.unshift(histories[i].price);
      }
      setCoinData((currentData) => {
        return {...currentData, [coinId]: data };
      });
    }

    // 1시간 단위
    else if(is1Hour) {
      const data = [];
      for(let i = 0; i < histories.length; i += 60) {
        data.unshift(histories[i].price);
      }
      setCoinData((currentData) => {
        return {...currentData, [coinId]: data };
      });
    }
  }

  // 10분 단위 선택 ---------------------------------------------------------------------------------------------------------
  const onClick10m = () => {
    set10Minute(true);
    set30Minute(false);
    set1Hour(false);
  }

  // 20분 단위 선택 ---------------------------------------------------------------------------------------------------------
  const onClick30m = () => {
    set10Minute(false);
    set30Minute(true);
    set1Hour(false);
  }

  // 30분 단위 선택 ---------------------------------------------------------------------------------------------------------
  const onClick1h = () => {
    set10Minute(false);
    set30Minute(false);
    set1Hour(true);
  }

  // 코인 그래프 선택 ---------------------------------------------------------------------------------------------------------
  const onClickCoin = (index) => {
    // 선택했던 걸 재선택하면 선택 취소
    if(index == selectCoin) {
      setSelectCoin(null);
      onCoinClick(null);
    }
    // 아닐 경우 선택
    else {
      setSelectCoin(index);
      onCoinClick(coins[index].name + " 코인");
    }
  }

  // 화면 크기 변할 때마다 가로길이 가져오기 ---------------------------------------------------------------------------------------------------------
  const handleResize = () => {
    let newWidth = Math.round(window.innerWidth / 3.5 * 2.5 / (gridSize + 1)) * (gridSize + 1) - (gridSize * 2.5 + 2);
    setChartWidth(Math.max(newWidth, minWidth));
  };

  // 가로선 삽입 ---------------------------------------------------------------------------------------------------------
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

  // 세로선 삽입 ---------------------------------------------------------------------------------------------------------
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
          h -= Math.floor(m/60);
          if(m % 60 != 0) h--;
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
          h -= Math.floor(m/60);
          if(m % 60 != 0) h--;
        }
        else {
          h -= Math.floor(m/60);
        }
        m %= 60;
      }
      // 1시간 단위
      else if(is1Hour) {
        h = (h - i) % 24;
      }

      if(h <= 0) {
        h = (24 + h) % 24;
      }

      // 수직 격자선, 꺾은선 그래프 넣기 ---------------------------------------------------------------------------------------------------------
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
            {Object.keys(coinDatas).length != 0 && coinDatas != null ? coins.map((coin, idx) => (
              (selectCoin == idx || selectCoin == null) && coinDatas[coin.id] !== undefined ?
              <GraphLine
                key={coin.id}
                style={{
                  marginTop: getGraphHeight(coinDatas[coin.id][index]),
                  width: getGraphLineSize(coinDatas[coin.id][index], coinDatas[coin.id][index + 1]),
                  transform: `rotate(${getGraphLineDegree(coinDatas[coin.id][index], coinDatas[coin.id][index + 1])}deg)`,
                  backgroundColor: coin.color}}
                onClick={() => onClickCoin(idx)}/>
              : null
            )) : null}
          </GraphLines>

        </GridVertical>
      );
    }

    return lines;
  }

  // 그래프 높이(?) 계산 ---------------------------------------------------------------------------------------------------------
  // 현재 코인값을 그래프 길이에 비례해서...
  const getGraphHeight = (cost1) => {
    const top = 3000 - cost1;
    return top / 500 * (gridSize + 1);
  }

  // 그래프 꺾은 선 길이 계산 ---------------------------------------------------------------------------------------------------------
  const getGraphLineSize = (cost1, cost2) => {
    const graphHeight = Math.abs(cost1 - cost2);
    const size = Math.sqrt(Math.pow(graphWidth, 2) + Math.pow(graphHeight, 2));
    return size / 500 * (gridSize + 1) + 2;
  }

  // 그래프 꺾은 선 각도 계산 ---------------------------------------------------------------------------------------------------------
  const getGraphLineDegree = (cost1, cost2) => {
    const graphHeight = Math.abs(cost1 - cost2);
    const degree = Math.atan(graphHeight / graphWidth) * 180 / Math.PI;
    return degree * Math.sign(cost1 - cost2);
  }

  // 화면 크기 변할 때마다 호출 ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      setTime();
    } 
    
  }, [currentTime]);

  useEffect(() => {
    setTime();
  }, [is10Minute, is30Minute, is1Hour, chartWidth]);

  useEffect(() => {
  }, [coinDatas]);

  useEffect(() => {
    if(coinName != null) {
      const coinNameSub = coinName.substr(0, coinName.length - 3);
      for(let i = 0; i < coins.length; i++) {
        if(coinNameSub == coins[i].name) {
          setSelectCoin(i);
          break;
        }
      }
    }
    else {
      setSelectCoin(null);
    }
  }, [coinName]);
  
  // ---------------------------------------------------------------------------------------------------------
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
          {Object.keys(coinDatas).length != 0 && coinDatas != null ? coins.map((coin, idx) => (
              (selectCoin == idx || selectCoin == null) && coinDatas[coin.id] !== undefined ?
            <GraphStartLine
              key={coin.id}
              style={{
                marginTop: getGraphHeight((Number(coinDatas[coin.id][0]) + Number(coinDatas[coin.id][1])) / 2),
                width: getGraphLineSize(Number(coinDatas[coin.id][0]), Number(coinDatas[coin.id][1])) / 2 ,
                transform: `rotate(${getGraphLineDegree(Number(coinDatas[coin.id][0]), Number(coinDatas[coin.id][1]))}deg)`,
                backgroundColor: coin.color}}
              onClick={() => onClickCoin(idx)}/>
            : null
          )): null}
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
  cursor: default;
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
  cursor: default;
`;
const GridVerticalRangeEndText = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  color: ${palette.grid_range};
  margin: 9px 84.5px 0px auto;
  cursor: default;
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
  cursor: default;
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
  margin-left: ${gridSize / 2 - 1}px;
  left: 1px;
  z-index: 10;
  border-radius: 10px;
  cursor: pointer;
`;

export default StockChart;