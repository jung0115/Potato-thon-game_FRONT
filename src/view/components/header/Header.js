// 헤더
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from "../Context";
import client from 'gamja-backend-client';

import styled from "styled-components";
import palette from "../../styles/colorPalatte";
import Login from '../../pages/Login';

import logo from "../../../assets/logo.png";
import profile from "../../../assets/profile.png";

const host = 'https://api.miruku.dog';

const Header = ({ exchange, property, selectExchange, selectProperty }) => {
  const [isExchange, setExchange] = useState(exchange);  // 헤더에서 거래소 탭 선택 유무
  const [isProperty, setProperty] = useState(property);  // 헤더에서 자산 탭 선택 유무
  const [isExchangeHover, setExchangeHover] = useState(false); // 거래소 탭 마우스 hover
  const [isPropertyHover, setPropertyHover] = useState(false); // 자산 탭 마우스 hover
  const [isSelectLogin, setSelectLogin] = useState(false);     // 로그인 버튼 선택 유무
  const [teamName, setTeamName] = useState('');
  const [cookies] = useCookies(['token']);
  const { user } = useAuth();
    
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

  const loginClose = (teamName) => {
    setSelectLogin(false);
    setTeamName(teamName || '');
  }

  const getConnection = () => {
    return {
      host: host,
      headers: {
        ...cookies.token ? {
          'Authorization': `Bearer ${cookies.token}`
        } : null
      }
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { token } = cookies;

        if (token) {
          const connection = getConnection();
          const getMyUser = async () => {
            try {
              await client.functional.user.me.getMyUser(
                getConnection()
              ).then(response => {
                const userName = response.user.name;
                setTeamName(userName);
              });
            } catch (error) {
              console.error("사용자 정보 가져오기 오류: ", error);
            }
          }
          getMyUser();
        } else {
          setTeamName('');
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [cookies.token]);

  useEffect(() => {
    // 로그인된 사용자가 있다면 teamName을 설정
    if (user) {
      setTeamName(user.name);
    }
  }, [user]);

  // 탭 선택 변할 때마다 새로고침
  useEffect(() => {
  }, [isExchange, isProperty]);

  // 사이트명, 로고 선택 시 페이지 새로고치
  const handleRefresh = () => {
    window.location.reload();
  };

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