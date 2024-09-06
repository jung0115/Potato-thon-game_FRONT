// 메인 홈
import React from "react";

import styled from "styled-components";
import palette from "../styles/colorPalatte";

import Header from "../components/header/Header.tsx";
import ExchangeTab from "../components/exchange/ExchangeTab";
import PropertyTab from "../components/property/PropertyTab";
import { useMainController } from "../../controller/MainController";

// 메인: 헤더 + (거래소 or 자산)
const Main = () => {
  const { isExchange, isProperty, selectExchange, selectProperty } = useMainController();

  return(
    <Container>
      {/* 헤더 */}
      <Header 
        exchange={isExchange}
        property={isProperty}
        selectExchange={selectExchange}
        selectProperty={selectProperty}/>

      {/* 거래소, 자산 탭 선택 유무에 따라 보여지는 값 */}
      {/* 거래소탭 선택 시 */}
      {isExchange && <ExchangeTab />}

      {/* 자산탭 선택 시 */}
      {isProperty && <PropertyTab />}

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