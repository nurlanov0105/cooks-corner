interface IUserInfo {
   userId: number | null;
   name: string | null;
}

export interface IAuthState {
   accessToken: string | null;
   userInfo: IUserInfo;
}
