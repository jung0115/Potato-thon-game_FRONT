import { useState, useEffect } from 'react';
import client from 'gamja-backend-client';

// API BASE URL
const host = 'https://api.miruku.dog';

interface Cookies {
  token?: string;
}

interface Qna {
  question: string;
  answer: string;
  answeredAt: string;
}

export const useQuestionModel = ( cookies: Cookies ) => {
  const [qnaList, setQnaList] = useState<Qna[]>([]);
  const [isNewAnswer, setIsNewAnswer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputQuestion, setInputQuestion] = useState<string>("");

  const closeLoading = () => {
    setIsLoading(false);
  }

  const getConnection = () => ({
    host: host,
    headers: {
      ...cookies.token ? {
        'Authorization': `Bearer ${cookies.token}`
      } : {}
    }
  });

  const createQna = async () => {
    if (inputQuestion.length > 0) {
      if (!cookies.token) {
        alert("질문하기는 로그인 후에 사용할 수 있습니다!");
      } else {
        setIsLoading(true);
        await client.functional.qna.create(
          getConnection(),
          { question: inputQuestion }
        );
        setInputQuestion('');
      }
    }
  };

  const getAllQnA = async () => {
    await client.functional.qna.answered.listAnswered(getConnection())
      .then(response => {
        const sortedItems = [...response.qna];
        sortedItems.sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
        setQnaList(sortedItems);
      });
  };

  useEffect(() => {
    getAllQnA();
    const interval = setInterval(() => {
      getAllQnA();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (qnaList.length > 0) {
      const minute = Math.floor((new Date().getTime() - new Date(qnaList[0].answeredAt).getTime()) / (1000 * 60));
      setIsNewAnswer(minute < 10);
    }
  }, [qnaList]);

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