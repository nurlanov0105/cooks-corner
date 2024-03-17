// import { getTokensFromLS } from '.';
// import { ITokens } from '../interfaces/interface';

export const addTokensToLS = ({ accessToken, refreshToken }: any) => {
   const updatedTokensData = {
      accessToken,
      refreshToken,
   };

   if (updatedTokensData) {
      localStorage.setItem('currentTokens', JSON.stringify(updatedTokensData));
   }
};
