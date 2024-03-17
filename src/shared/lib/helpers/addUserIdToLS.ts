export const addUserIdToLS = (userId: number) => {
   const updatedUserId = {
      userId,
   };

   if (updatedUserId) {
      localStorage.setItem('currentUserId', JSON.stringify(updatedUserId));
   }
};
