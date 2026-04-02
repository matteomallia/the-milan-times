import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    language : languageReducer,
  },
});