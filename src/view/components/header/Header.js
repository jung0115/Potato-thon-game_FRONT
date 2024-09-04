// 헤더
import React from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalatte";
import Login from '../../pages/Login';

import logo from "../../../assets/logo.png";
import profile from "../../../assets/profile.png";

const Header = ({
  isExchange,
  isProperty,
  isExchangeHover,
  isPropertyHover,
  isSelectLogin,
  teamName = '',
  onClickExchange,
  onClickProperty,
  setExchangeHover,
  setPropertyHover,
  loginClose,
  setSelectLogin,
  handleRefresh
 }) => {
  return(
    <Container>
      <HeaderContainer>
        {/* 감자톤 로고 + 서비스명 */}
        <LogoAndTitle>
          <PotatoLogo
            src={logo}
            onClick={handleRefresh}/>
          <PotatoTitle
             onClick={handleRefresh}>
              POTATO THON
          </PotatoTitle>
        </LogoAndTitle>

        <TabContainer>
          {/* 거래소 탭 버튼 */}
          {isExchangeHover || (isExchange && !isPropertyHover) ? 
            <Tab
              onMouseOver={() => {setExchangeHover(true)}}
              onMouseOut={() => {setExchangeHover(false)}}
              onClick={onClickExchange}>
              <SelectTabBtn>거래소</SelectTabBtn>
              <SelectLine/>
            </Tab>
            :
            <Tab
              onMouseOver={() => {setExchangeHover(true)}}
              onMouseOut={() => {setExchangeHover(false)}}
              onClick={onClickExchange}>
              <UnselectTabBtn>거래소</UnselectTabBtn>
              <UnselectLine/>
            </Tab>
          }
          {/* 자산 탭 버튼 */}
          {isPropertyHover || (isProperty && !isExchangeHover ) ? 
            <Tab
              onMouseOver={() => {setPropertyHover(true)}}
              onMouseOut={() => {setPropertyHover(false)}}
              onClick={onClickProperty}>
              <SelectTabBtn>자산</SelectTabBtn>
              <SelectLine/>
            </Tab>
            :
            <Tab
              onMouseOver={() => {setPropertyHover(true)}}
              onMouseOut={() => {setPropertyHover(false)}}
              onClick={onClickProperty}>
              <UnselectTabBtn>자산</UnselectTabBtn>
              <UnselectLine/>
            </Tab>
          }
        </TabContainer>

        {/* 로그인 버튼 or 사용자명 */}
        {teamName.length > 0 ?
          <UserContainer>
            <UserName> {teamName} 팀 </UserName>
            <UserProfile src={profile}/>
          </UserContainer>
          :
          <UserContainer>
            {isSelectLogin ? (
              <>
                <SelectLoginBtn>로그인</SelectLoginBtn>
                <LoginOverlay>
                  <Login onClose={loginClose}/>
                </LoginOverlay>
              </>
            ) 
              :
              <LoginBtn 
                onClick={() => setSelectLogin(true)}
              > 
                로그인
              </LoginBtn>
            }
          </UserContainer>
        }

      </HeaderContainer>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  background-color: ${palette.box_bg_color};
  margin: 0 13px 0 12px;
`;

// 헤더 내용
const HeaderContainer = styled.div`
  display: flex;
`;

const LogoAndTitle = styled.div`
  display: flex;
  align-items: end;
`;

// 감자톤 로고
const PotatoLogo = styled.img`
  width: 52px;
  height: 58px;
  margin: 20px 5px 21px 15px;
  cursor: pointer;
`;
// 사이트명
const PotatoTitle = styled.div`
  font-size: 28px;
  color: ${palette.white};
  font-family: 'Pretendard-ExtraBold';
  margin: auto 179px 25px 0px;
  cursor: pointer;
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
  cursor: pointer;
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
  width: 130px;
  height: 9px;
  margin: 12px 0px 3px 0px;
  background-color: ${palette.orange};
`;
// 선택되지 않은 탭 강조 라인
const UnselectLine = styled.div`
  width: 155px;
  height: 9px;
  margin: 12px 0px 3px 0px;
  background-color: ${palette.box_bg_color};
`;

const UserContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: end;
  margin-bottom: 10px;
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
  padding: 8.58px 24.5px;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.orange};
  background-color: ${palette.white};
  border-radius: 60px;
  border: 1px solid ${palette.orange};
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
  /* width: 63px;
  height: 63px; */
  width: 48px;
  height: 48px;
  margin: 20px 20px 20px 0px;
`;

const LoginOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export default Header;