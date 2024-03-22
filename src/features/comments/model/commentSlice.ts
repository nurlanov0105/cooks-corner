import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   comments: [],
   size: 12,
   page: 0,
};

const commentSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      setComments(state, action) {
         state.comments = action.payload;
      },
      setSize(state, action) {
         state.size = action.payload;
      },
      setPage(state, action) {
         state.page = action.payload;
      },
   },
});

export const { setComments, setSize, setPage } = commentSlice.actions;

export default commentSlice.reducer;
