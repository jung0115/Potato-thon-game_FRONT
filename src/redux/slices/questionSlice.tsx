import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Qna {
  question: string;
  answer: string;
  answeredAt: string;
}

interface QuestionState {
  qnaList: Qna[];
  isNewAnswer: boolean;
  isLoading: boolean;
  inputQuestion: string;
  token?: string;
}

const initialState: QuestionState = {
  qnaList: [],
  isNewAnswer: false,
  isLoading: false,
  inputQuestion: '',
  token: undefined,
};

export const fetchQnaList = createAsyncThunk('question/fetchQnaList', async (token?: string) => {
  // Replace with your API call
  const response = await fetch('/api/qna', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.qna;
});

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setInputQuestion(state, action) {
      state.inputQuestion = action.payload;
    },
    closeLoading(state) {
      state.isLoading = false;
    },
    setNewAnswer(state, action) {
      state.isNewAnswer = action.payload;
    },
    setToken(state, action) {  // Add a reducer to set the token
      state.token = action.payload;
    },
    createQna(state) {
      if (state.inputQuestion.length > 0) {
        if (!state.token) {
          alert("질문하기는 로그인 후에 사용할 수 있습니다!");
        } else {
          state.isLoading = true;
          // Add your API call here
          state.inputQuestion = '';
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnaList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQnaList.fulfilled, (state, action) => {
        state.qnaList = action.payload;
        state.isLoading = false;
        const minute = Math.floor((new Date().getTime() - new Date(state.qnaList[0]?.answeredAt).getTime()) / (1000 * 60));
        state.isNewAnswer = minute < 10;
      })
      .addCase(fetchQnaList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setInputQuestion, closeLoading, setNewAnswer, createQna } = questionSlice.actions;

export default questionSlice.reducer;