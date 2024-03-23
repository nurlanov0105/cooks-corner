import { RecipesEndpoints, UsersEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';
import { IUserRecipes } from '../model/types';

export const getUser = async (userId: string) => {
   try {
      const { data } = await baseApiInstance.get(UsersEndpoints.USERS + '/' + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const getProfileRecipes = async (params: IUserRecipes) => {
   try {
      const { data } = await baseApiInstance.get(
         `${RecipesEndpoints.RECIPES}?query=${params.category}&size=${params.size}&page=${params.page}`
      );
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const getUserRecipes = async (userId: string) => {
   try {
      const { data }: any = await baseApiInstance.get(UsersEndpoints.USERS_RECIPES + userId);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const updateProfile = async (formData: string) => {
   try {
      const { data }: any = await baseApiInstance.put(UsersEndpoints.USERS, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      });

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

export const getUserFollowers = async (userId: number) => {
   try {
      const response = await baseApiInstance.get(`${UsersEndpoints.USERS}/${userId}/followers`);
      return response;
   } catch (error) {
      console.log(error);
   }
};
export const getUserFollowing = async (userId: number) => {
   try {
      const response = await baseApiInstance.get(`${UsersEndpoints.USERS}/${userId}/following`);
      return response;
   } catch (error) {
      console.log(error);
   }
};
