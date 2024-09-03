// 자산 탭
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalatte";
import { useCookies } from "react-cookie";

import client from 'gamja-backend-client';

import walletIcon from '../../../assets/ic_wallet.png';
import potatoImg from '../../../assets/img_potato_angry.png';

const title = ["코인명", "매입가", "현재가", "대비", "수량"];

const host = 'https://api.miruku.dog';

const PropertyTab = () => {
  const [cookies] = useCookies(['token']);
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [price, setPrice] = useState(0);
  
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

  const getUserMoney = async () => {
    await client.functional.user.me.getMyUser(
      getConnection()
      ).then((response) => {
        // 사용자 보유 화폐
        setPrice(response.user.balance);
        console.log(response.user);
    });
  }

  const getCoins = async () => {
    await client.functional.coin.getCoins(
        getConnection()
    ).then(response => {
      const allcoin = response.coins;
      const myCoin = coins.map(coin => coin.name);
      setAllCoins(allcoin.filter(coin => myCoin.includes(coin.name)));
    });
  }

  const getMyCoins = async () => {
    await client.functional.user.me.coins.getMyCoins(
      getConnection()
    ).then(response => {
      const coin = response.coins.filter(coin => coin.amount > 0);
      setCoins(coin);
      getCoins();
      getUserMoney();
    });
  }

  useEffect(() => {
    if (cookies.token) {
      getMyCoins();
    }
  }, [cookies.token, coins]);

  return(
    <Container>
      { cookies.token ? (
        <>
          <MoneyContainer>
            <WalletIcon src={walletIcon}/>
            <PossMoney> 보유 화폐 </PossMoney>
            <PossMoney style={{ marginLeft: '90px' }}> 
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </PossMoney>
            <PossMoney style={{marginLeft: '10px'}}> 원 </PossMoney>
          </MoneyContainer>
        
          <CoinContainer>
            <TitleContainer>
              {title.map((item) => (
                <Title> {item} </Title>
              ))}
            </TitleContainer>
            <Line/>
            <ListContainer>
              {coins.map((item, idx) => {
                const fmPurchasingPrice = (item.lastPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                const fmPresentPrice = allCoins[idx] ? (allCoins[idx].price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
                const priceDiff = allCoins[idx] ? (allCoins[idx].price || 0) - item.lastPrice : 0;

                return (
                  <CoinList>
                    <CoinInfo style={{ paddingLeft: '43px'}}> {item.name} </CoinInfo>
                    <CoinInfo 
                      style={{ 
                        textAlign: 'right',
                        paddingRight: '80px'
                        // paddingRight: '75px'
                      }}> 
                        {fmPurchasingPrice}
                    </CoinInfo>
                    <CoinInfo 
                      style={{ 
                        textAlign: 'right',
                        paddingRight: '160px'
                        // paddingRight: '155px'
                      }}
                      fontColor={priceDiff}
                    > 
                      {fmPresentPrice} 
                    </CoinInfo>
                    <CoinInfo 
                      fontColor={priceDiff}
                      style={{ paddingRight: '70px' }}
                    >
                      {priceDiff !== 0 ? (
                        <>
                          {priceDiff > 0 ? '▲' : '▼'} {" "}
                          {Math.abs(priceDiff).toLocaleString()} 
                        </>) : ('−')
                      } 
                    </CoinInfo>
                    <CoinInfo style={{ paddingRight: '32px'}}> {item.amount} </CoinInfo>
                  </CoinList>
                )
              })}
            </ListContainer>
          </CoinContainer>
        </>
      ) : (
        <NoticePage> 
          <NoticeImg src={potatoImg}/>
          <NoticeText> 로그인 후 이용 가능합니다. </NoticeText>
        </NoticePage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.bg_color};
`;
const MoneyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 13px;
  padding: 15px 30px;
  align-items: center;
  background-color: ${palette.box_bg_color};
`;
const WalletIcon = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 10px;
`;
const PossMoney = styled.p`
  color: #C8C8C8;
  font-size: 19px;
  font-weight: 700;
  font-family: 'Pretendard-Bold';
`;
const CoinContainer = styled.div`
  position: relative;
  height: 65vh;
  flex-shrink: 0;
  margin: 0 13px;
  background-color: ${palette.box_bg_color};
  z-index: 99;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  justify-content: space-around;
`;
const Title = styled.p`
  color: #C8C8C8;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Pretendard-Bold';
`;
const Line = styled.div`
  height: 1px;
  background: #252525;
  margin: 15px 20px;
`;
const ListContainer = styled.div`
    white-space: nowrap;
    justify-content: space-around;
`;
const CoinList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const CoinInfo = styled.p`
  position: relative;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Pretendard-Bold';
  text-align: center;
  flex: 1;
  padding-left: 10px;
  color: ${(props) => props.fontColor > 0 ? 
    '#AA1919' : props.fontColor < 0 ? 
    '#1F27D7' : `#C8C8C8`
  };
`;
const NoticePage = styled.div`
  height: 83vh;
  display: flex;
  flex-direction: column;
  background-color: ${palette.box_bg_color};
  margin: 13px;
  align-items: center;
  justify-content: center;
`;
const NoticeImg = styled.img`
  width: 100px;
  height: 100px;
`;
const NoticeText = styled.p`
  margin-top: 30px;
  color: ${palette.white};
  font-size: 18px;
  font-family: 'Pretendard-Regular';
  text-align: center;
`;

export default PropertyTab;