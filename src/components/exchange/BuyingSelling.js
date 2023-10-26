// 매수/매도
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

const BuyingSelling = () => {
  // 주문, 판매 버튼 비활성화, 활성화 색상
  const ResultBtnColor = [palette.buy_sell_result, palette.orange];

  // 매수, 매도 탭 선택
  const [isBuying, setIsBuying] = useState(true);
  
  // 매수, 매도할 금액
  const [resultValue, setResultValue] = useState(0);

  // 매수, 매도 수량 숫자만 입력 가능하도록
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const integerValue = parseInt(value, 10);
    if(integerValue >= 0) setInputValue(integerValue);
    else setInputValue('');
  }

  // 매수 탭 선택
  const onClickBuyTab = () => {
    setIsBuying(true);
    setInputValue('');
    setResultValue(0);
  }
  // 매도 탭 선택
  const onClickSellTab = () => {
    setIsBuying(false);
    setInputValue('');
    setResultValue(0);
  }

  useEffect(() => {
  }, [inputValue]);
  
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
                <BuySellNumber>29</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 1 coin당 가격 */}
            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>1,920</BuySellNumber>
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
                  onChange={handleInputChange} />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매수 금액 */}
            <BuySellResultContent>
              <BuySellResultLabel>매수 금액</BuySellResultLabel>

              <BuySellValues>
                <BuySellNumber>{resultValue}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            {/* 주문하기 버튼 */}
            <SubmitBtn style={inputValue > 0 ?
              { backgroundColor: ResultBtnColor[1] }
              : { backgroundColor: ResultBtnColor[0] }}>
              주문하기
            </SubmitBtn>

          </BuySellContainer>

          :

          <BuySellContainer> {/* -------------------- 매도 -------------------- */}
            {/* 매도 가능 */}
            <BuySellContent>
              <BuySellLabel>매도 가능</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>29</BuySellNumber>
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 1 coin당 가격 */}
            <BuySellContent>
              <BuySellLabel>1 coin 당</BuySellLabel>

              <BuySellValues>
                <BuySellNumber>1,920</BuySellNumber>
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
                  onChange={handleInputChange} />
                <BuySellMeasure>coin</BuySellMeasure>
              </BuySellValues>
            </BuySellContent>

            {/* 매도 금액 */}
            <BuySellResultContent>
              <BuySellResultLabel>매도 금액</BuySellResultLabel>

              <BuySellValues>
                <BuySellNumber>{resultValue}</BuySellNumber>
                <BuySellResultMeasure>원</BuySellResultMeasure>
              </BuySellValues>
            </BuySellResultContent>

            {/* 주문하기 버튼 */}
            <SubmitBtn style={inputValue > 0 ?
              { backgroundColor: ResultBtnColor[1] }
              : { backgroundColor: ResultBtnColor[0] }}>
              주문하기
            </SubmitBtn>


          </BuySellContainer>
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
`;
const BuySellResultLabel = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Bold';
  color: ${palette.buy_sell_result};
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
`;

export default BuyingSelling;