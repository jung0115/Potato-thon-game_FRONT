// 도움말
import React from "react";
import { useCookies } from "react-cookie";

import styled from "styled-components";
import palette from "../../styles/colorPalatte";

import submitIcon from "../../../assets/ic_question_submit.png";
import checkNewIcon from "../../../assets/ic_question_check.png";

import Loading from "./Loading";

import { useQuestionController } from '../../../controller/exchange/QuestionController';

const Question = () => {
  const [cookies] = useCookies(['token']);
  const { 
    qnaList,
    isNewAnswer,
    isLoading,
    inputQuestion,
    setInputQuestion,
    createQna,
    closeLoading
  } = useQuestionController(cookies);

  return(
    <Container>
      {/* 설명 */}
      <TitleContainer>
        <Title>도움말</Title>
        {/*<HelpIcon src={helpIcon}/>*/}
      </TitleContainer>

      {/*<BottomLine/>*/}

      {/* 질문 요청 */}
      <QuestionContainer>
        <QuestionInput
          type="text"
          placeholder="감자톤 주식 게임 관련 질문만 작성부탁드립니다"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}/>
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
        {isNewAnswer &&
          <NewQnaContainer>
            <NewNoitceText>새로운 답변이 올라왔습니다</NewNoitceText>
            <CheckNewIcon src={checkNewIcon} />
          </NewQnaContainer>
        }
      </QnaListAll>

        {/* 로딩창 */}
        {isLoading &&
          <LoadingOverlay>
            <Loading closeLoading={() => closeLoading()} time={200} />
          </LoadingOverlay>
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

const CheckNewIcon = styled.img`
  width: 25.328px;
  height: 24.12px;
  margin: 3px 7.5px 6.5px 130px;
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
