import { createAction } from '@reduxjs/toolkit';
import { AuthData, State } from '../interface/auth-interface';
import { TextbookState } from '../interface/interface';

export const ActionType = {
  ADD_USER_ID_DATA: 'data/addUserIdData',
  ADD_USER_AUTH_DATA: 'data/addUserAuthData',
  ADD_NEW_TOKENS: 'data/addNewToken',
  CHANGE_AUTHORIZE_STATUS: 'data/changeAuthorizeStatus',
  RESET_STORE: 'data/resetStore',
  ADD_TEXTBOOK_STATE: 'data/addTextbookState',
};

export const addUserIdData = createAction(ActionType.ADD_USER_ID_DATA, (newUserIdData) => ({
  payload: newUserIdData,
}));

export const addUserAuthData = createAction(ActionType.ADD_USER_AUTH_DATA, (userAuthData: AuthData) => ({
  payload: userAuthData,
}));

export const addNewTokens = createAction(ActionType.ADD_NEW_TOKENS, (newTokens: { token: string, refreshToken: string}) => ({
  payload: newTokens,
}));

export const changeAuthorizeStatus = createAction(ActionType.CHANGE_AUTHORIZE_STATUS, (status: boolean) => ({
  payload: status,
}));

export const resetStore = createAction(ActionType.RESET_STORE, (initialState: State) => ({
  payload: initialState,
}));

export const addTextbookState = createAction(ActionType.ADD_TEXTBOOK_STATE, (textBookState: TextbookState) => ({
  payload: textBookState,
}));
