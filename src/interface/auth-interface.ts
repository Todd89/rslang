export interface UserIdData {
  id: string,
  email: string,
  name: string,
}

export interface AuthData {
  message: string; 
  token: string; 
  refreshToken: string; 
  userId: string; 
  name: string; 
}

export type State = {
  user: UserIdData | null;
  userAuthData: null | AuthData,
  authorizeStatus: boolean,
}

export type UserAction = {
  type: string;
  user: UserIdData;
}

export type DispatchType = (args: UserAction) => UserAction
