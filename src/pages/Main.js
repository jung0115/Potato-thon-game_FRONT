import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../styles/colorPalatte";

import Header from '../components/header/Header';

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
      {/* 헤더 */}
      <Header 
        exchange={isExchange}
        property={isProperty}
        selectExchange={selectExchange}
        selectProperty={selectProperty}/>

      {/* 거래소, 자산 탭 선택 유무에 따라 보여지는 값 */}
      {/* 거래소탭 선택 시 */}
      { isExchange ? 
        <div style={{color: '#ffffff'}}>거래소</div>
        :
        null
      }
      {/* 자산탭 선택 시 */}
      { isProperty ? 
        <div style={{color: '#ffffff'}}>자산</div>
        :
        null
      }
        
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

const Test1 = styled.div`
  width: 240px;
  height: 136px;
  display: block;
  background-color: #D9D9D9;
  justify-items: center;
  
`;
const Test2 = styled.div`
  display: block;
  padding-top: 30px;
  margin: 0 46px;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: 400;
  color: ${palette.box_bg_color};
  align-content: center;
  justify-content: center;
`;

const Test3 = styled.div`
  display: block;
  padding: 10px 90px;
  
  margin: 0 10px;
  border-radius: 8px;
  background-color: #F1F1F1;
  color: #09A0E0;
  font-size: 18px;
  font-weight: 600;
  align-content: center;
  justify-content: center;
`;

export default Main;