import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isOpen: false,
   componentName: null,
   name: '',
   data: null,
   isLoading: true,
};

const mobileModalSlice = createSlice({
   name: 'mobileModal',
   initialState,
   reducers: {
      showMobileModal: (state, action) => {
         state.isOpen = true;
         state.componentName = action.payload.componentName;
         state.name = action.payload.name;
         state.data = action.payload.data;
         state.isLoading = action.payload.isLoading;
      },
      closeMobileModal: (state) => {
         state.isOpen = false;
         state.componentName = null;
      },
   },
});

export const { showMobileModal, closeMobileModal } = mobileModalSlice.actions;

export default mobileModalSlice.reducer;
