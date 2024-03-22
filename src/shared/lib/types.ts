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
// export interface ICommentResponse {
//    rpt: string | undefined | null;
//    password: string;
// }

export interface ICommentForm {
   objectId: number | string;
   text: string;
   isReply: boolean;
}
