import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   comments: [],
   limit: 6,
   currentPage: 0,
   totalPages: 1,
};

const commentSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      setComments(state, action) {
         state.comments = action.payload;
      },
      setLimit(state, action) {
         state.limit = action.payload;
      },
      setCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
      setTotalPages(state, action) {
         state.totalPages = action.payload;
      },
   },
});

export const { setComments, setLimit, setCurrentPage, setTotalPages } = commentSlice.actions;

export default commentSlice.reducer;
