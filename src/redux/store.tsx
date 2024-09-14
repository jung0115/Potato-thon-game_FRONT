import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.tsx";
import questionReducer from "./slices/questionSlice.tsx"

const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;