// 자산 탭
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/colorPalatte";
import { useAuth } from "../Context";

import walletIcon from '../../assets/ic_wallet.png';
import potatoImg from '../../contents/img_potato_angry.png';

const title = ["코인명", "매입가", "현재가", "대비", "수량"];

const PropertyTab = () => {
  const [money, setMoney] = useState(0);
  const { user } = useAuth();
  const coin = [
    {
      name: "칙촉코인",
      purchasingPrice: 1395,
      presentPrice: 1295,
      quantity: 1,
    },
    {
      name: "마이쮸코인",
      purchasingPrice: 795,
      presentPrice: 810,
      quantity: 3,
    }
  ]

  return(
    <Container>
      { user ? (
        <>
          <MoneyContainer>
        <WalletIcon src={walletIcon}/>
        <PossMoney> 보유 화폐 </PossMoney>
          <PossMoney style={{ marginLeft: '90px' }}> 
            {user.balance} 
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
            {coin.map((item, idx) => {
              const fmPurchasingPrice = (item.purchasingPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              const fmPresentPrice = (item.presentPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              const priceDiff = item.presentPrice - item.purchasingPrice;

              return (
                <CoinList>
                  <CoinInfo style={{ paddingLeft: '43px'}}> {item.name} </CoinInfo>
                  <CoinInfo 
                    style={{ 
                      textAlign: 'right',
                      paddingRight: '75px'
                    }}> 
                      {fmPurchasingPrice}
                  </CoinInfo>
                  <CoinInfo 
                    style={{ 
                      textAlign: 'right',
                      paddingRight: '135px'
                    }}
                    fontColor={priceDiff}
                  > 
                    {fmPresentPrice} 
                  </CoinInfo>
                  <CoinInfo 
                    fontColor={priceDiff}
                    style={{ paddingRight: '57px' }}
                  >
                    {priceDiff !== 0 ? (
                      <>
                        {priceDiff > 0 ? '▲' : '▼'} {" "}
                        {Math.abs(priceDiff)} 
                      </>) : ('−')
                    } 
                  </CoinInfo>
                  <CoinInfo style={{ paddingRight: '32px'}}> {item.quantity} </CoinInfo>
                </CoinList>
              )})}
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
  padding: 30px;
  align-items: center;
  background-color: ${palette.box_bg_color};
`;
const WalletIcon = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 10px;
`;
const PossMoney = styled.text`
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
  padding-top: 35px;
  justify-content: space-around;
`;
const Title = styled.text`
  color: #C8C8C8;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Pretendard-Bold';
`;
const Line = styled.div`
  height: 1px;
  background: #252525;
  margin: 25px 20px;
`;
const ListContainer = styled.div`
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
    '#010CFF' : `#C8C8C8`
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