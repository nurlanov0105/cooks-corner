import { RecipesEndpoints, UsersEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';

export const getUser = async (userId: string) => {
   try {
      const { data } = await baseApiInstance.get(UsersEndpoints.USERS + '/' + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const getProfileRecipes = async (category: string) => {
   try {
      const { data } = await baseApiInstance.get(`${RecipesEndpoints.RECIPES}?query=${category}`);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const getUserRecipes = async (userId: string) => {
   try {
      const { data } = await baseApiInstance.get(UsersEndpoints.USERS_RECIPES + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const updateProfile = async (formData: string) => {
   try {
      const { data } = await baseApiInstance.post(UsersEndpoints.USERS, formData);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const follow = async (userId: number) => {
   try {
      const { data } = await baseApiInstance.post(UsersEndpoints.USERS_FOLLOW + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const unFollow = async (userId: number) => {
   try {
      const { data } = await baseApiInstance.post(UsersEndpoints.USERS_UNFOLLOW + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};
