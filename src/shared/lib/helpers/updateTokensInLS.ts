import { ITokens } from '../interfaces/interface';

export const updateTokensInLS = (tokens: ITokens) => {
   const { accessToken, refreshToken } = tokens;
   const updatedTokensData = {
      accessToken: accessToken,
      refreshToken: refreshToken,
   };

   if (updatedTokensData) {
      localStorage.setItem('currentTokens', JSON.stringify(updatedTokensData));
   }
};
