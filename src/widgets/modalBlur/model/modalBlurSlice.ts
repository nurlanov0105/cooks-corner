import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isOpen: false,
   componentName: null,
};

const modalBlurSlice = createSlice({
   name: 'modalBlur',
   initialState,
   reducers: {
      showModalBlur: (state, action) => {
         state.isOpen = true;
         state.componentName = action.payload;
      },
      closeModalBlur: (state) => {
         state.isOpen = false;
         state.componentName = null;
      },
   },
});

export const { showModalBlur, closeModalBlur } = modalBlurSlice.actions;

export default modalBlurSlice.reducer;
