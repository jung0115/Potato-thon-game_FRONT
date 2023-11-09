// 도움말
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import helpIcon from "../../contents/ic_question_help.png";
import submitIcon from "../../contents/ic_question_submit.png";
import checkNewIcon from "../../contents/ic_question_check.png";

import Loading from "./Loading";

import client from 'gamja-backend-client';

// api BASE URL
const host = 'https://api.miruku.dog';

const Question = () => {
  const [cookies] = useCookies(['token']);
  const [qnaList, setQnaList] = useState([]);
  const [isNewAnswer, setIsNewAnswer] = useState(false);

  // 로딩
  const [isLoading, setIsLoading] = useState(false);

  const closeLoading = () => {
    setIsLoading(false);
  }

  const [inputQuestion, setInputQuestion] = useState("");

  const handleInputChange = (e) => {
    let input = e.target.value;
    // 500자를 초과하면 뒤에 글자 자르기
    if(input.length >= 500) {
      input = input.substr(0, 501);
    }
    setInputQuestion(input);
  };

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
    
    if(inputQuestion.length > 0) {
      // 로그인 안 한 상태
      if(!cookies.token) {
        alert("질문하기는 로그인 후에 사용할 수 있습니다!");
      }
      // 로그인 된 상태
      else {
        setIsLoading(true);
        await client.functional.qna.create(
          getConnection(),
          {
            question: inputQuestion, // Question
          }
        );
        setInputQuestion('');
      }
    }
  }
  
  //createQna();
  // 답변 완료된 질문 --------------------------------------------------------------------------------------------
  async function getAllQnA() {
    await client.functional.qna.answered.listAnswered(
      getConnection()
      ).then((response) => {
        //console.log(response.qna);
        const sortedItems = [...response.qna];
        sortedItems.sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
        setQnaList([...response.qna]);
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
      '46e70e92-8da6-4c78-8258-7283f913eb0b',
      {
        answer: "도움말 답변 6:21", // Answer
      }
    );
  }
  
  useEffect(() => {
    getAllQnA();

    // 5초마다 질문 리스트 업데이트
    const interval = setInterval(() => {
      getAllQnA();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 10분 내에 답변된 질문이 있는지 확인
    if(qnaList.length > 0) {
      const minute = Math.floor((new Date() - new Date(qnaList[0].answeredAt)) / (1000 * 60));
      if(minute < 10) setIsNewAnswer(true);
      else setIsNewAnswer(false);
    }
  }, [qnaList]);

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
        <QuestionInput
          type="text"
          placeholder="감자톤 주식 게임 관련 질문만 작성부탁드립니다"
          value={inputQuestion}
          onChange={handleInputChange}/>
        <QuestionSubmitBtn
          src={submitIcon}
          onClick={createQna}/>
      </QuestionContainer>

      <QnaListAll>
        {/* 질문답변 리스트 */}
        <QnaListContainer>
          <QnaList
            style={
              isNewAnswer ? {
                paddingTop: 35,
                height: 145.75,
              } : {
                paddingTop: 0,
                height: 180.75,
              }
            }>
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
        {isNewAnswer ? 
          <NewQnaContainer>
            <NewNoitceText>최근 10분 이내 답변이 달린 질문이 있어요</NewNoitceText>
            <CheckNewIcon src={checkNewIcon}/>
          </NewQnaContainer>
          : null
        }
      </QnaListAll>

        {/* 로딩창 */}
        {isLoading ?
          <LoadingOverlay>
            <Loading
              closeLoading={closeLoading}
              time={200}/>
          </LoadingOverlay>  
          : null
        }

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
  cursor: default;
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
  flex: 1;
  width: auto;
  background-color: #00000000;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  color: ${palette.black};
  margin: 12px 17px 9px 0px;
  /* overflow: auto; */
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
  cursor: default;
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

export default Question;
