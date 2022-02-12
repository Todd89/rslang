import { NameSpace } from '../root-reducer';
import { AuthData } from '../../interface/auth-interface';

export const getAuthorizeStatus = (state: any) => state[NameSpace.DATA].authorizeStatus;
export const getUser = (state: any) => state[NameSpace.DATA].user;
export const getUserAuthData = (state: any): AuthData => state[NameSpace.DATA].userAuthData;
export const getNewToken = (state: any): string => state[NameSpace.DATA].userAuthData.refreshToken;
export const getUserId = (state: any): string => state[NameSpace.DATA].userAuthData.userId;
