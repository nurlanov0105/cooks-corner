export const getTokensFromLS = () => {
   const data = localStorage.getItem('currentTokens');

   if (data) {
      const { refreshToken, accessToken } = JSON.parse(data);

      return {
         refreshToken,
         accessToken,
      };
   }

   return {
      refreshToken: null,
      accessToken: null,
   };
};
