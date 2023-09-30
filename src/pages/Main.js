// 메인 홈
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../styles/colorPalatte";

import Header from '../components/header/Header';
import ExchangeTab from "../components/exchange/ExchangeTab";
import PropertyTab from "../components/property/PropertyTab";

// 메인: 헤더 + (거래소 or 자산)
const Main = () => {
  const [isExchange, setExchange] = useState(true);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(false); // 헤더에서 자산 탭 선택 유무

  // 거래소탭 선택
  const selectExchange = () => {
    setExchange(true);
    setProperty(false);
  }

  // 자산 탭 선택
  const selectProperty = () => {
    setExchange(false);
    setProperty(true);
  }

  // 탭 선택 변할 때마다 새로고침
  useEffect(() => {
  }, [isExchange, isProperty]);

  return(
    <Container>
      <div>
        수정이 완료
      </div>
      {/* 헤더 */}
      <Header 
        exchange={isExchange}
        property={isProperty}
        selectExchange={selectExchange}
        selectProperty={selectProperty}/>

      {/* 거래소, 자산 탭 선택 유무에 따라 보여지는 값 */}
      {/* 거래소탭 선택 시 */}
      { isExchange ? 
        <ExchangeTab />
        :
        null
      }
      {/* 자산탭 선택 시 */}
      { isProperty ? 
        <PropertyTab />
        :
        null
      }
      
      <CoinList/>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  position: relative;
  height: max-content;
  
  min-height: 100vh;
  background-color: ${palette.bg_color};
`;

export default Main;