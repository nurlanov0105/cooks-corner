export const addEmailToLS = (email: string) => {
   const newEmail = {
      email,
   };

   if (newEmail) {
      localStorage.setItem('currentEmail', JSON.stringify(newEmail));
   }
};
