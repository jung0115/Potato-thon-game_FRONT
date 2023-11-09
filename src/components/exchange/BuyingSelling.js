// 매수/매도
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import Loading from "./Loading";

import client from 'gamja-backend-client';

// api BASE URL
const host = 'https://api.miruku.dog';

const BuyingSelling = ({ onClose, _coinId, _remainAmount, _currentPrice }) => {
  const [cookies] = useCookies(['token']);
  //const [token, setToken] = useState(null);

  const [remainAmount, setRemainAmount] = useState(_remainAmount); // 잔여 코인
  const [ownAmount, setOwnAmount] = useState(0);                   // 사용자 보유 코인
  const [currentPrice, setCurrentPrice] = useState(_currentPrice); // 현재 코인 가격
  const [ownMoney, setOwnMoney] = useState(0);                     // 사용자 보유 화폐(원)

  // 주문, 판매 버튼 비활성화, 활성화 색상
  const ResultBtnColor = [palette.buy_sell_result, palette.orange];
  
  const [isLoading, setIsLoading] = useState(false); // 로딩

  const [isBuying, setIsBuying] = useState(true); // 매수, 매도 탭 선택
  const [resultValue, setResultValue] = useState(0); // 매수, 매도할 금액
  const [inputValue, setInputValue] = useState(''); // 매수, 매도 수량 (숫자만 입력 가능)

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

  // 코인 종류 조회 ---------------------------------------------------------------------------------------------------------
  // 잔여 개수 조회
  async function coinGetCoins() {
    await client.functional.coin.getCoins(
      getConnection()
    ).then(response => {
      setRemainAmount(0);
      for(let i = 0; i < response.coins.length; i++) {
        if(response.coins[i].id == _coinId) {
          setRemainAmount(Number(response.coins[i].amount));
          console.log(remainAmount);
        }
      }
    })
  }

  //coinGetCoins()

  // 현재 코인의 가격 확인 ---------------------------------------------------------------------------------------------------------
  async function getCoinPrice() {
    if(_coinId != null) {
      const currentDate = new Date(); // 현재 시간
      const pastDate = new Date();
      pastDate.setMinutes(currentDate.getMinutes() - 1);

      await client.functional.coin.price_histories.getPriceHistories(
        getConnection(),
        _coinId, // Coin ID
        {
          from: pastDate.toString(), // From
          to: currentDate.toString() // To
        }
      ).then(response => {
        //console.log(response.histories);
        setCurrentPrice(response.histories[0].price);
        //console.log(currentPrice);
      });
    }
  }

  // 사용자 보유 화폐 조회 ----------------------------------------------------------------------
  async function getOwnMoney() {
    // Get user
    await client.functional.user.me.getMyUser(
      getConnection()
      ).then((response) => {
        // 사용자 보유 화폐
        setOwnMoney(response.user.balance);
        console.log(response.user);
    });
  }
  getOwnMoney()
  // 사용자 보유 코인 조회 ----------------------------------------------------------------------
  async function getOwnCoin() {
    // Get user
    await client.functional.user.me.coins.getMyCoins(
      getConnection()
      ).then((response) => {
        // response.coins;
        // console.log(response);
        setOwnAmount(0);
        for(let i = 0; i < response.coins.length; i++) {
          if(response.coins[i].id == _coinId) {
            setOwnAmount(Number(response.coins[i].amount));
            //console.log(ownAmount);
          }
        }
    });
  }
  
  // 코인 매수 -------------------------------------------------------------------
  async function buyCoinApi() {
    if(_coinId != null && currentPrice > 0) {
      getCoinPrice();
      coinGetCoins();
      setResultValue(Number(inputValue) * Number(currentPrice));
      // Buy coin
      await client.functional.market.coin.buy(
        getConnection(),
        _coinId, // Coin ID
        {
          amount: inputValue.toString(), // Amount
          price: currentPrice.toString(), // Price (400 if it does not equal to real price)
        }
      ).catch(error => {
        console.error('Error during buy:', error);
      });
    }
  }
  //buyCoinApi();

  // 코인 매도 -------------------------------------------------------------------
  async function sellCoinApi() {
    if(_coinId != null && currentPrice > 0) {
      getCoinPrice();
      coinGetCoins();
      setResultValue(Number(inputValue) * Number(currentPrice));
      // Buy coin
      await client.functional.market.coin.sell(
        getConnection(),
        _coinId, // Coin ID
        {
          amount: inputValue.toString(), // Amount
          price: currentPrice.toString(), // Price (400 if it does not equal to real price)
        }
      ).catch(error => {
        console.error('Error during sell:', error);
      });
    }
  }
  //sellCoinApi();

  const closeLoading = () => {
    setIsLoading(false);
    onClose();
  }

  // 매수 코인 입력 handle
  const handleBuyInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const integerValue = parseInt(value, 10);
    if(integerValue >= 0) {
      // 잔여 수량보다 많은 값을 입력할 경우 => 잔여 수량 값을 보여주기
      if(integerValue > remainAmount) setInputValue(remainAmount);
      // 잔여 수량보다 적은 값을 입력할 경우 => 그대로 보여주기
      else setInputValue(integerValue);
    }
    else setInputValue('');
  }

  // 매도 코인 입력 handle
  const handleSellInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const integerValue = parseInt(value, 10);
    if(integerValue >= 0) {
      // 사용자 보유 수량보다 많은 값을 입력할 경우 => 사용자 보유 수량 값을 보여주기
      if(integerValue > ownAmount) setInputValue(ownAmount);
      // 사용자 보유 수량보다 적은 값을 입력할 경우 => 그대로 보여주기
      else setInputValue(integerValue);
    }
    else setInputValue('');
  }

  // 매수 탭 선택
  const onClickBuyTab = () => {
    setIsBuying(true);
    setInputValue('');
    setResultValue(0);
    getCoinPrice(); // 현재 코인 가격 조회
    coinGetCoins(); // 잔여 코인 개수 조회
  }
  // 매도 탭 선택
  const onClickSellTab = () => {
    setIsBuying(false);
    setInputValue('');
    setResultValue(0);
    getCoinPrice(); // 현재 코인 가격 조회
    getOwnCoin(); // 사용자 보유 코인 개수 조회
  }

  // 주문하기 - 매수
  const buyCoin = () => {
    // 사용자가 보유한 화폐로 구매 가능한지 확인
    // 구매 가능
    if(resultValue <= ownMoney) {
      setIsLoading(true);
      buyCoinApi();
    }
    // 구매 불가
    else {
      alert('보유하신 화폐로 구매가 불가능합니다!');
    }
  }

  //판매하기 - 매도
  const sellCoin = () => {
    setIsLoading(true);
    sellCoinApi();
  }

  useEffect(() => {
    setResultValue(Number(inputValue) * Number(currentPrice));
  }, [inputValue]);

  useEffect(() => {
    getCoinPrice();
    
  }, [isBuying]);

  useEffect(() => {
    setRemainAmount(_remainAmount);
  }, [_remainAmount]);

  useEffect(() => {
    setCurrentPrice(_currentPrice);
  }, [_currentPrice]);
  
  useEffect(() => {
  }, [currentPrice, remainAmount, ownAmount, ownMoney]);

  return(
    <Container>
      <Title>매수/매도</Title>

      <Contents>
        {/* 매수, 매도 선택 탭 */}
        {isBuying ?
          <TabContainer>
            <SelectTab
              onClick={onClickBuyTab}>
              매수
            </SelectTab>
            <UnselectRightTab
              onClick={onClickSellTab}>
              매도
            </UnselectRightTab>
          </TabContainer>
          :
          <TabContainer>
            <UnselectLeftTab
              onClick={onClickBuyTab}>
              매수
            </UnselectLeftTab>
            <SelectTab
              onClick={onClickSellTab}>
              매도
            </SelectTab>
          </TabContainer>
        }
        
        {isBuying ? 
          <BuySellContainer> {/* -------------------- 매수 -------------------- */}
            {/* 매수 가능 */}
            <BuySellContent>
              <BuySellLabel>매수 가능</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>{remainAmount}</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 1 coin당 가격 */}
            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>{Number(currentPrice).toLocaleString()}</BuySellNumber>
                <BuySellMeasure>원</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매수 수량 */}
            <BuySellContent>
              <BuySellLabel>매수 수량</BuySellLabel>

              <BuySellValues>
                <BuySellInput
                  type="text"
                  placeholder="매수할 수량을 입력해주세요."
                  value={inputValue}
                  onChange={handleBuyInputChange} />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매수 금액 */}
            <BuySellResultContent>
              <BuySellResultLabel>매수 금액</BuySellResultLabel>

              <BuySellValues>
                <BuySellNumber>{resultValue.toLocaleString()}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            {/* 주문하기 버튼 */}
            <SubmitBtn style={inputValue > 0 ?
              { backgroundColor: ResultBtnColor[1] }
              : { backgroundColor: ResultBtnColor[0] }}
              onClick={buyCoin}>
              주문하기
            </SubmitBtn>

          </BuySellContainer>

          :

          <BuySellContainer> {/* -------------------- 매도 -------------------- */}
            {/* 매도 가능 */}
            <BuySellContent>
              <BuySellLabel>매도 가능</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>{ownAmount}</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 1 coin당 가격 */}
            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>{Number(currentPrice).toLocaleString()}</BuySellNumber>
                <BuySellMeasure>원</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매도 수량 */}
            <BuySellContent>
              <BuySellLabel>매도 수량</BuySellLabel>

              <BuySellValues>
                <BuySellInput
                  type="text"
                  placeholder="매도할 수량을 입력해주세요."
                  value={inputValue}
                  onChange={handleSellInputChange} />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매도 금액 */}
            <BuySellResultContent>
              <BuySellResultLabel>매도 금액</BuySellResultLabel>

              <BuySellValues>
                <BuySellNumber>{resultValue.toLocaleString()}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            {/* 판매하기 버튼 */}
            <SubmitBtn style={inputValue > 0 ?
              { backgroundColor: ResultBtnColor[1] }
              : { backgroundColor: ResultBtnColor[0] }}
              onClick={sellCoin}>
              판매하기
            </SubmitBtn>


          </BuySellContainer>
        }

        {/* 로딩창 */}
        {isLoading ?
          <LoadingOverlay>
            <Loading
              closeLoading={closeLoading}
              time={400}/>
          </LoadingOverlay>  
          : null
        }

      </Contents>

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.box_bg_color};
  margin-top: 13px;
  padding: 11px 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.sub_title};
  padding-bottom: 12px;
  padding-left: 2px;
  cursor: default;
`;

const Contents = styled.div`
  background-color: ${palette.buy_sell_box};
  border-radius: 8px;
`;

// 매수, 매도 선택 탭
const TabContainer = styled.div`
  display: flex;
  width: auto;
`;
const SelectTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  color: ${palette.select_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  cursor: pointer;
`;
const UnselectRightTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  background-color: ${palette.unselect_buy_sell_bg};
  color: ${palette.unselect_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  border-radius: 0px 8px 0px 0px;
  cursor: pointer;
`;
const UnselectLeftTab = styled.div`
  flex: 1;
  padding: 13px 0px;
  text-align: center;
  background-color: ${palette.unselect_buy_sell_bg};
  color: ${palette.unselect_buy_sell_text};
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  border-radius: 8px 0px 0px 0px;
  cursor: pointer;
`;

const BuySellContainer = styled.div`
  padding: 16px 12px 10px 12px;
`;
const BuySellContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  margin: 0px 8px 16px 8px;
`;
const BuySellResultContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  margin: 0px 8px 11px 8px;
`;
const BuySellLabel = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
  cursor: default;
`;
const BuySellResultLabel = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.buy_sell_result};
  cursor: default;
`;
const BuySellValues = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
const BuySellNumber = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
`;
const BuySellMeasure = styled.div`
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  color: ${palette.buy_sell_measure};
  margin-left: 6px;
`;
const BuySellResultMeasure = styled.div`
  font-size: 21px;
  font-family: 'Pretendard-Bold';
  color: ${palette.buy_sell_result};
  margin-left: 6px;
`;
const BuySellInput = styled.input`
  width: 162px;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid ${palette.buy_sell_input_border};
  background-color: #00000000;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
  text-align: right;

  &::placeholder {
    font-size: 14px;
    font-family: 'Pretendard-Regular';
  }
`;
const SubmitBtn = styled.div`
  background-color: ${palette.buy_sell_result};
  border-radius: 10px;
  padding: 11px 0px;
  text-align: center;
  font-size: 23px;
  font-family: 'Pretendard-Bold';
  color: ${palette.white};
  cursor: pointer;
`;

const LoadingOverlay = styled.div`
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

export default BuyingSelling;