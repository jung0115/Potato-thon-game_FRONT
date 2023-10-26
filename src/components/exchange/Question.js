// 도움말
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import helpIcon from "../../contents/ic_question_help.png";
import submitIcon from "../../contents/ic_question_submit.png"

const Question = () => {
  return(
    <Container>
      {/* 설명 */}
      <TitleContainer>
        <Title>도움말</Title>
        <HelpIcon src={helpIcon}/>
      </TitleContainer>

      <BottomLine/>

      {/* 질문 요청 */}
      <QuestionContainer>
        <QuestionInput type="text" placeholder="감자톤 주식 게임 관련 질문만 작성부탁드립니다" />
        <QuestionSubmitBtn src={submitIcon}/>
      </QuestionContainer>

      {/* 질문답변 리스트 */}

    </Container>
  );
}

const Container = styled.div`
  display: block;
  background-color: ${palette.bg_color};
  margin-top: 28px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 25px;
  font-family: 'Pretendard-Bold';
  color: ${palette.question_title};
  margin-left: 4px;
`;
const HelpIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 7px;
`;
const BottomLine = styled.div`
  background-color: ${palette.header_btm_line};
  height: 0.85px;
  margin-top: 10px;
`;

const QuestionContainer = styled.div`
  display: flex;
  background-color: ${palette.question_bg};
  padding: 0px 17px 0px 17px;
  margin: 23px 17px 0px 0px;
  border-radius: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.45) inset;
`;
const QuestionInput = styled.input`
  width: 300px;
  background-color: #00000000;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  color: ${palette.black};
  margin: 18px 0px 15px 0px;
`;
const QuestionSubmitBtn = styled.img`
  width: 15.808px;
  height: 29.469px;
  margin: 13px 0px 7px auto;
  transform: rotate(0.859deg);
`;

export default Question;
