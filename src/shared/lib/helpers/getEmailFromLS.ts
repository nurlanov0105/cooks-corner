export const getEmailFromLS = () => {
   const data = localStorage.getItem('currentEmail');

   if (data) {
      const { email } = JSON.parse(data);

      return {
         email,
      };
   }

   return {
      email: null,
   };
};
