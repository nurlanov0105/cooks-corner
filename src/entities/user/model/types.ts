export interface IUserRecipes {
   category: string;
   size: number;
   page: number;
}

export interface IUserState {
   category: string;
   user: any;
   profileRecipes: [];
   profileData: {
      name: null;
      bio: null;
   };
   profileImg: '';
   wrapperRef: null;
   currentPage: 0;
   limit: 12;
}
