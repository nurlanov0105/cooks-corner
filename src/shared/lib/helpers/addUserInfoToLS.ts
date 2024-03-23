interface IParams {
   userId: number;
   name: string;
}

export const addUserInfoToLS = ({ userId, name }: IParams) => {
   const updatedUserInfo = {
      userId,
      name,
   };

   if (updatedUserInfo) {
      localStorage.setItem('currentUserInfo', JSON.stringify(updatedUserInfo));
   }
};
