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

export interface ICommentForm {
   objectId: number;
   text: string;
   isReply: boolean;
}

export interface IRecipesParams {
   categoryId: number;
   size: number;
   page: number;
}

export interface ISearchParams {
   query: string;
   size: number;
   page: number;
}

export interface IActionParams {
   actionId: number;
   objectTypeId: number;
   objectId: number;
}

export interface IRecipeCard {
   recipeId: number;
   title: string;
   author: string;
   imageUrl: string;
   likes: number;
   bookmarks: number;
   isLiked: boolean;
   isBookmarked: boolean;
}
