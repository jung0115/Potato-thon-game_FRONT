import { useQuestionModel } from '../../model/exchange/QuestionModel';

export const useQuestionController = (cookies) => {
  const {
    qnaList,
    isNewAnswer,
    isLoading,
    inputQuestion,
    setInputQuestion,
    createQna,
    closeLoading
  } = useQuestionModel(cookies);

  return {
    qnaList,
    isNewAnswer,
    isLoading,
    inputQuestion,
    setInputQuestion,
    createQna,
    closeLoading
  };
};