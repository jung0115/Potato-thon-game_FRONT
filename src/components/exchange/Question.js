// 도움말
import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import helpIcon from "../../contents/ic_question_help.png";
import submitIcon from "../../contents/ic_question_submit.png";
import checkNewIcon from "../../contents/ic_question_check.png";

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

      <QnaListAll>
        {/* 질문답변 리스트 */}
        <QnaListContainer>
          sss
        </QnaListContainer>

        {/* 새롭게 답변이 달린 질문 알림 */}
        <NewQnaContainer>
          <NewNoitceText>답변이 달린 질문이 있어요</NewNoitceText>
          <CheckNewNotice>
            <CheckNewText>읽음으로 표시하기</CheckNewText>
            <CheckNewIcon src={checkNewIcon}/>
          </CheckNewNotice>
        </NewQnaContainer>
      </QnaListAll>

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
  margin: 23px 17px 13px 0px;
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

const QnaListAll = styled.div`;
  position: relative;
`;
const QnaListContainer = styled.div`
  background-color: ${palette.qna_list_bg};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.45) inset;
  padding: 15px 0px 15px 10px;
`;
const NewQnaContainer = styled.div`
  display: flex;
  width: 326.52px;
  background-color: ${palette.new_qna_bg};
  border-radius: 7px 0px 10px 10px;
  margin-left: 10px;
  position: absolute;
  left: 0;
  top: 0;
`;
const NewNoitceText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  color: ${palette.white};
  margin: 12px 0px 7.5px 9px;
`;
const CheckNewNotice = styled.div`
  margin-left: auto;
  display: flex;
`;
const CheckNewText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  color: ${palette.white};
  margin: 12px 6.5px 7.5px 0px;
`;
const CheckNewIcon = styled.img`
  width: 25.328px;
  height: 24.12px;
  margin: 3px 7.5px 6.5px 0px;
`;

export default Question;
