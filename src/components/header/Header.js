// 헤더
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import logo from "../../contents/logo.png";
import profile from "../../contents/profile.png";

const Header = ({ exchange, property, selectExchange, selectProperty }) => {
  const [isExchange, setExchange] = useState(exchange);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(property);  // 헤더에서 자산 탭 선택 유무
  const [isExchangeHover, setExchangeHover] = useState(false); // 거래소 탭 마우스 hover
  const [isPropertyHover, setPropertyHover] = useState(false); // 자산 탭 마우스 hover
  const [isSelectLogin, setSelectLogin] = useState(false);     // 로그인 버튼 선택 유무
  const name = "";
    
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
      <HeaderContainer>
        {/* 감자톤 로고 + 서비스명 */}
        <LogoAndTitle>
          <PotatoLogo src={logo}/>
          <PotatoTitle>POTATO THON</PotatoTitle>
        </LogoAndTitle>

        <TabContainer>
          {/* 거래소 탭 버튼 */}
          {isExchange || isExchangeHover ? 
            <Tab
              onMouseOver={() => {setExchangeHover(true); setProperty(false);}}
              onMouseOut={() => {setExchangeHover(false); setProperty(!isExchange);}}>
              <SelectTabBtn onClick={onClickExchange}>거래소</SelectTabBtn>
              <SelectLine/>
            </Tab>
            :
            <Tab
              onMouseOver={() => {setExchangeHover(true); setProperty(false);}}
              onMouseOut={() => {setExchangeHover(false); setProperty(!isExchange);}}>
              <UnselectTabBtn onClick={onClickExchange}>거래소</UnselectTabBtn>
              <UnselectLine/>
            </Tab>
          }
          {/* 자산 탭 버튼 */}
          {isProperty || isPropertyHover ? 
            <Tab
              onMouseOver={() => {setPropertyHover(true); setExchange(false);}}
              onMouseOut={() => {setPropertyHover(false); setExchange(!isProperty);}}>
              <SelectTabBtn onClick={onClickProperty}>자산</SelectTabBtn>
              <SelectLine/>
            </Tab>
            :
            <Tab
              onMouseOver={() => {setPropertyHover(true); setExchange(false);}}
              onMouseOut={() => {setPropertyHover(false); setExchange(!isProperty);}}>
              <UnselectTabBtn onClick={onClickProperty}>자산</UnselectTabBtn>
              <UnselectLine/>
            </Tab>
          }
        </TabContainer>

        {/* 로그인 버튼 or 사용자명 */}
        {name.length > 0 ?
          <UserContainer>
            <UserName>{name} 팀</UserName>
            <UserProfile src={profile}/>
          </UserContainer>
          :
          <UserContainer
            onClick={() => setSelectLogin(true)}>
            {isSelectLogin ?
              <SelectLoginBtn>로그인</SelectLoginBtn>
              :
              <LoginBtn>로그인</LoginBtn>
            }
          </UserContainer>
        }

      </HeaderContainer>

      <BottomLine/>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  background-color: ${palette.bg_color};
`;

// 헤더 내용
const HeaderContainer = styled.div`
  display: flex;
`;

// 하단 수평바
const BottomLine = styled.div`
  background-color: ${palette.header_btm_line};
  height: 4.56px;
`;

const LogoAndTitle = styled.div`
  display: flex;
  align-items: end;
`;

// 감자톤 로고
const PotatoLogo = styled.img`
  width: 52px;
  height: 58px;
  margin: 24px 14px 21px 9px;
`;
// 사이트명
const PotatoTitle = styled.div`
  font-size: 28px;
  color: ${palette.white};
  font-family: 'Pretendard-ExtraBold';
  margin: 60.5px 179px 25px 0px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: end;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 155px;
`;

// 선택된 탭 버튼
const SelectTabBtn = styled.div`
  font-size: 23px;
  font-weight: 600;
  color: ${palette.orange};
  font-family: 'Pretendard-Bold';
  cursor: pointer;
`;
// 선택되지 않은 탭 버튼
const UnselectTabBtn = styled.div`
  font-size: 23px;
  font-weight: 600;
  color: ${palette.white};
  font-family: 'Pretendard-Bold';
  cursor: pointer;
`;

// 선택된 탭 강조 라인
const SelectLine = styled.div`
  width: 155px;
  height: 9px;
  margin: 12px 0px 3px 0px;
  background-color: ${palette.orange};
`;
// 선택되지 않은 탭 강조 라인
const UnselectLine = styled.div`
  width: 155px;
  height: 9px;
  margin: 12px 0px 3px 0px;
  background-color: ${palette.bg_color};
`;

const UserContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: end;
`;

// 로그인 버튼
const LoginBtn = styled.div`
  padding: 9.58px 25.5px;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.login_brown};
  background-color: ${palette.white};
  border-radius: 60px;
  cursor: pointer;
  margin: 0px 13px 9px 0px;
`;
// 선택된 로그인 버튼
const SelectLoginBtn = styled.div`
  padding: 9.58px 25.5px;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.orange};
  background-color: ${palette.white};
  border-radius: 60px;
  cursor: pointer;
  margin: 0px 13px 9px 0px;
`;

// 사용자명
const UserName = styled.div`
  font-size: 22px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
  margin: 0px 13px 20px 0px;
`;
// 사용자 프로필
const UserProfile = styled.img`
  width: 63px;
  height: 63px;
  margin: 20px 20px 20px 0px;
`;

export default Header;