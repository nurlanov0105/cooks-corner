// import { getTokensFromLS } from '.';
// import { ITokens } from '../interfaces/interface';

export const updateTokenInLS = ({ tokens }: any) => {
   const { accessToken, refreshToken } = tokens;

   const updatedTokensData = {
      accessToken,
      refreshToken,
   };

   if (updatedTokensData) {
      localStorage.setItem('currentTokens', JSON.stringify(updatedTokensData));
   }
};
