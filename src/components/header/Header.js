import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import logo from "../../contents/logo.png";

const Header = ({ exchange, property, selectExchange, selectProperty }) => {
  const [isExchange, setExchange] = useState(exchange);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(property);  // 헤더에서 자산 탭 선택 유무
  const name = "감자톤";
    
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
      <LogoAndTitle>
        <PotatoLogo src={logo}/>
        <PotatoTitle>POTATO THON</PotatoTitle>
      </LogoAndTitle>

      <Tabs>
        {/* 거래소 탭 버튼 */}
        {isExchange ? 
          <SelectTabBtn onClick={onClickExchange}>거래소</SelectTabBtn>
          :
          <UnselectTabBtn onClick={onClickExchange}>거래소</UnselectTabBtn>
        }
        {/* 자산 탭 버튼 */}
        {isProperty ? 
          <SelectTabBtn onClick={onClickProperty}>자산</SelectTabBtn>
          :
          <UnselectTabBtn onClick={onClickProperty}>자산</UnselectTabBtn>
        }
      </Tabs>

      {/* 로그인 버튼 or 사용자명 */}
      <UserContainer>
        {name.length > 0 ?
          <UserName>{name} 님</UserName>
          :
          <LoginBtn>로그인</LoginBtn>
        }
      </UserContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette.box_bg_color};
  padding: 14px 42px 18px 20px;
`;

const LogoAndTitle = styled.div`
  display: flex;
  align-items: end;
`;

// 감자톤 로고
const PotatoLogo = styled.img`
  width: 40px;
  height: 45px;
`;
// 사이트명
const PotatoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${palette.white};
  margin-right: 62px;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
`;

// 거래소 버튼
const SelectTabBtn = styled.div`
  margin-left: 68px;
  font-size: 27px;
  font-weight: 600;
  color: ${palette.orange};
  cursor: pointer;
`;
// 자산 버튼
const UnselectTabBtn = styled.div`
  margin-left: 68px;
  font-size: 27px;
  font-weight: 600;
  color: ${palette.white};
  cursor: pointer;
`;

const UserContainer = styled.div`
  margin-left: auto;
`;

// 로그인 버튼
const LoginBtn = styled.div`
  padding: 4px 17px;
  font-size: 14px;
  font-weight: 600;
  color: ${palette.black};
  background-color: ${palette.login_yellow};
  border-radius: 60px;
  cursor: pointer;
`;

// 사용자명
const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${palette.white};
`;

export default Header;