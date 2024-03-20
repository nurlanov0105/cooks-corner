export interface ILoginRequest {
   email: string;
   password: string;
}
export interface ILoginResponse {
   accessToken: string;
   refreshToken: string;
   userId: number;
}

export interface IRegisterRequest {
   name: string;
   email: string;
   password: string;
   url: string;
}

export interface IResendEmailRequest {
   email: string;
   url: string;
}
export interface IResetPasswordRequest {
   rpt: string | undefined | null;
   password: string;
}
