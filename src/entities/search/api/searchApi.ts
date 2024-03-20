import { RecipesEndpoints, UsersEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';

export const searchUsers = async (params: any) => {
   try {
      const { data } = await baseApiInstance.get(
         `${UsersEndpoints.USERS_SEARCH}?query=${params.query}&&size=${params.size}&&page=${params.page}`
      );
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const searchRecipes = async (params: any) => {
   try {
      const { data } = await baseApiInstance.get(
         `${RecipesEndpoints.RECIPES}?query=${params.query}&&size=${params.size}&&page=${params.page}`
      );
      return data;
   } catch (error) {
      console.log(error);
   }
};
