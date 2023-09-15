import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import logo from "../../contents/logo.png";

const Header = ({ exchange, property, selectExchange, selectProperty }) => {
  const [isExchange, setExchange] = useState(exchange);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(property); // 헤더에서 자산 탭 선택 유무
    
  // 거래소탭 선택
  const onClickExchange = () => {
    setExchange(true);
    setProperty(false);
    selectExchange();
  }

  // 자산탭 선택
  const onClickProperty = () => {
    setExchange(false);
    setProperty(true);
    selectProperty();
  }
  
  // 탭 선택 변할 때마다 새로고침
  useEffect(() => {
  }, [isExchange, isProperty]);

  return(
    <Container>
      {/* 감자톤 로고 + 서비스명 */}
      <PotatoLogo src={logo}/>
      <PotatoTitle>POTATO THON</PotatoTitle>

      {isExchange ? 
        <SelectTabBtn onClick={onClickExchange}>거래소</SelectTabBtn>
        :
        <UnselectTabBtn onClick={onClickExchange}>거래소</UnselectTabBtn>
      }
      {isProperty ? 
        <SelectTabBtn onClick={onClickProperty}>자산</SelectTabBtn>
        :
        <UnselectTabBtn onClick={onClickProperty}>자산</UnselectTabBtn>
      }
    </Container>
  )
}

const Container = styled.div`
  display: block;
  position: relative;
  background-color: ${palette.box_bg_color};
  padding: 14px 56px 18px 20px;
`;

// 감자톤 로고
const PotatoLogo = styled.img`
  display: inline;
  width: 40px;
  height: 45px;
`;
// 사이트명
const PotatoTitle = styled.div`
  display: inline;
  font-size: 18px;
  font-weight: 700;
  color: ${palette.white};
  margin-right: 62px;
`;

// 거래소 버튼
const SelectTabBtn = styled.div`
  display: inline;
  margin-left: 68px;
  font-size: 20px;
  font-weight: 600;
  color: ${palette.orange};
  cursor: pointer;
`;
// 자산 버튼
const UnselectTabBtn = styled.div`
  display: inline;
  margin-left: 68px;
  font-size: 20px;
  font-weight: 600;
  color: ${palette.white};
  cursor: pointer;
`;

export default Header;