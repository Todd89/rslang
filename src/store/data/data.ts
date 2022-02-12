import { createReducer } from '@reduxjs/toolkit';
import {
  addUserIdData,
  addUserAuthData,
  addNewTokens,
  changeAuthorizeStatus,
  resetStore
} from '../action';
import { State } from '../../interface/auth-interface';


export const initialState: State = {
  user: null,
  userAuthData: null,
  authorizeStatus: false,
};


const data = createReducer(initialState, (builder) => {
  builder
    .addCase(addUserIdData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(addUserAuthData, (state, action) => {
      state.userAuthData = action.payload;
      state.authorizeStatus = true;
    })
    .addCase(addNewTokens, (state, action) => {
      if (state.userAuthData) {
        const { token, refreshToken } = action.payload; 
        state.userAuthData.token = token;
        state.userAuthData.refreshToken = refreshToken;
      }
    })
    .addCase(changeAuthorizeStatus, (state, action) => {
      state.authorizeStatus = action.payload;
    })
    .addCase(resetStore, (state, action) => {
      state = action.payload;
    });
});


export { data };