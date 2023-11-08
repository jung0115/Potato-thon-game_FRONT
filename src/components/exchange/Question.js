// 도움말
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import helpIcon from "../../contents/ic_question_help.png";
import submitIcon from "../../contents/ic_question_submit.png";
import checkNewIcon from "../../contents/ic_question_check.png";

import client from 'gamja-backend-client';

// api BASE URL
const host = 'https://api.miruku.dog';

const Question = () => {
  const [cookies] = useCookies(['token']);
  const [qnaList, setQnaList] = useState([]);

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

  // 질문 생성 --------------------------------------------------------------------------------------------
  async function createQna() {
    await client.functional.qna.create(
      getConnection(),
      {
        question: "이거 어떻게 해요?", // Question
      }
    );
  }
  //createQna();
  // 답변 완료된 질문 --------------------------------------------------------------------------------------------
  async function getAllQnA() {
    await client.functional.qna.answered.listAnswered(
      getConnection()
      ).then((response) => {
        //console.log(response.qna);
        setQnaList([...response.qna]);
        console.log(qnaList);
    });
  }
  // 답변 안 한 질문 --------------------------------------------------------------------------------------------
  async function getNonAnswerQnA() {
    await client.functional.qna.not_answered.manageListNotAnswered(
      getConnection()
      ).then((response) => {
        console.log(response.qna);
    });
  }
  //getNonAnswerQnA();
  // 답변 --------------------------------------------------------------------------------------------
  async function answerQna() {
    await client.functional.qna.answer.manageAnswer(
      getConnection(),
      '162eb540-257e-49e6-9638-dfa40563338c',
      {
        answer: "감자감자", // Answer
      }
    );
  }

  useEffect(() => {
    // 5초마다 현재 시간을 업데이트
    const interval = setInterval(() => {
      getAllQnA();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          <QnaList>
            {qnaList.map((qna, idx) => (
              <QnaItemContainer
                key={idx}>
                <QnaQuestion>
                  Q. {qna.question}
                </QnaQuestion>
                <QnaAnswer>
                  A. {qna.answer}
                </QnaAnswer>
              </QnaItemContainer>
            ))}
          </QnaList>
        </QnaListContainer>

        {/* 새롭게 답변이 달린 질문 알림 */}
        <NewQnaContainer>
          <NewNoitceText>최근 10분 이내 답변이 달린 질문이 있어요</NewNoitceText>
          <CheckNewIcon src={checkNewIcon}/>
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
  font-size: 22px;
  font-family: 'Pretendard-Bold';
  color: ${palette.question_title};
  margin-left: 4px;
`;
const HelpIcon = styled.img`
  width: 21px;
  height: 21px;
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
  margin: 15px 17px 8px 0px;
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
  margin: 12px 0px 9px 0px;
`;
const QuestionSubmitBtn = styled.img`
  width: 15.808px;
  height: 29.469px;
  margin: 10px 0px 3px auto;
  transform: rotate(0.859deg);
`;

const QnaListAll = styled.div`;
  position: relative;
`;
const QnaListContainer = styled.div`
  height: 200px;
  background-color: ${palette.qna_list_bg};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.45) inset;
  padding: 15px 0px 0px 10px;
`;
const NewQnaContainer = styled.div`
  display: flex;
  
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
  margin: 3px 7.5px 6.5px 6px;
`;

const QnaList = styled.div`
  height: 145.75px;
  padding-top: 35px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
    background: ${palette.white};
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 4px;
    background: #C1C1C1;
  }
`;
const QnaItemContainer = styled.div`
  margin-bottom: 15px;
  margin-right: 10px;
`;
const QnaQuestion = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-Bold';
  color: ${palette.qna_item_text};
`;
const QnaAnswer = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-family: 'Pretendard-Regular';
  color: ${palette.qna_item_text};
`;

export default Question;
