export const getUserIdFromLS = () => {
   const data = localStorage.getItem('currentUserId');

   if (data) {
      const { userId } = JSON.parse(data);

      return {
         userId,
      };
   }

   return {
      userId: null,
   };
};
