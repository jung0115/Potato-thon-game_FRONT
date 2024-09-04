// 매수/매도
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import Loading from "./Loading";
import { getInitialData, handleBuy, handleSell } from '../../../controller/exchange/BuyingSellingController';

const BuyingSelling = ({ onClose, _coinId, _remainAmount, _currentPrice }) => {
  const [cookies] = useCookies(['token']);
  const [remainAmount, setRemainAmount] = useState(_remainAmount);
  const [ownAmount, setOwnAmount] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(_currentPrice);
  const [ownMoney, setOwnMoney] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(true);
  const [resultValue, setResultValue] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (cookies.token && _coinId) {
      getInitialData(_coinId, cookies.token, setRemainAmount, setCurrentPrice, setOwnMoney, setOwnAmount);
    }
  }, [_coinId, cookies.token]);

  useEffect(() => {
    setResultValue(Number(inputValue) * Number(currentPrice));
  }, [inputValue, currentPrice]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const integerValue = parseInt(value, 10);
    if (integerValue >= 0) {
      if (isBuying) {
        setInputValue(integerValue > remainAmount ? remainAmount : integerValue);
      } else {
        setInputValue(integerValue > ownAmount ? ownAmount : integerValue);
      }
    } else {
      setInputValue('');
    }
  };

  const buyCoin = () => {
    if (cookies.token && _coinId) {
      handleBuy(_coinId, inputValue, currentPrice, cookies.token, setIsLoading, setResultValue, ownMoney);
    }
  };

  const sellCoin = () => {
    if (cookies.token && _coinId) {
      handleSell(_coinId, inputValue, currentPrice, cookies.token, setIsLoading, setResultValue);
    }
  };

  return (
    <Container>
      <Title>매수/매도</Title>
      <Contents>
        <TabContainer>
          <SelectTab
            onClick={() => { setIsBuying(true); setInputValue(''); setResultValue(0); }}
            active={isBuying}
          >
            매수
          </SelectTab>
          <UnselectRightTab
            onClick={() => { setIsBuying(false); setInputValue(''); setResultValue(0); }}
            active={!isBuying}
          >
            매도
          </UnselectRightTab>
        </TabContainer>

        {isBuying ? (
          <BuySellContainer>
            <BuySellContent>
              <BuySellLabel>매수 가능</BuySellLabel>
              <BuySellValues>
                <BuySellNumber>{remainAmount}</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>
              <BuySellValues>
                <BuySellNumber>{Number(currentPrice).toLocaleString()}</BuySellNumber>
                <BuySellMeasure>원</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellContent>
              <BuySellLabel>매수 수량</BuySellLabel>
              <BuySellValues>
                <BuySellInput
                  type="text"
                  placeholder="매수할 수량을 입력해주세요."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellResultContent>
              <BuySellResultLabel>매수 금액</BuySellResultLabel>
              <BuySellValues>
                <BuySellNumber>{resultValue.toLocaleString()}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            <SubmitBtn
              style={{ backgroundColor: inputValue > 0 ? palette.orange : palette.buy_sell_result }}
              onClick={buyCoin}
            >
              주문하기
            </SubmitBtn>
          </BuySellContainer>
        ) : (
          <BuySellContainer>
            <BuySellContent>
              <BuySellLabel>매도 가능</BuySellLabel>
              <BuySellValues>
                <BuySellNumber>{ownAmount}</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>
              <BuySellValues>
                <BuySellNumber>{Number(currentPrice).toLocaleString()}</BuySellNumber>
                <BuySellMeasure>원</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellContent>
              <BuySellLabel>매도 수량</BuySellLabel>
              <BuySellValues>
                <BuySellInput
                  type="text"
                  placeholder="매도할 수량을 입력해주세요."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            <BuySellResultContent>
              <BuySellResultLabel>매도 금액</BuySellResultLabel>
              <BuySellValues>
                <BuySellNumber>{resultValue.toLocaleString()}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            <SubmitBtn
              style={{ backgroundColor: inputValue > 0 ? palette.orange : palette.buy_sell_result }}
              onClick={sellCoin}
            >
              판매하기
            </SubmitBtn>
          </BuySellContainer>
        )}

        {isLoading && (
          <LoadingOverlay>
            <Loading closeLoading={() => setIsLoading(false)} time={400} />
          </LoadingOverlay>
        )}
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