import { useQuestionModel } from '../../model/exchange/QuestionModel';

interface Cookies {
  token?: string;
}

export const useQuestionController = ( cookies: Cookies ) => {
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