export const getUserInfoFomLS = () => {
   const data = localStorage.getItem('currentUserInfo');

   if (data) {
      const { userId, name } = JSON.parse(data);

      return {
         userId,
         name,
      };
   }

   return {
      userId: null,
      name: null,
   };
};
