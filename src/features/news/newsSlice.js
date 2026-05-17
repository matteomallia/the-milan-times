import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nytApi } from '../../services/nytApi'; 

export const fetchNews = createAsyncThunk('news/fetchNews', async (section, { rejectWithValue }) => {
  try {
    const data = await nytApi.fetchTopStories(section);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.fault?.faultstring || error.message || 'Errore di rete';
    return rejectWithValue(errorMessage);
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { articles: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => { 
        state.status = 'loading'; 
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; 
      });
  },
});

export default newsSlice.reducer;