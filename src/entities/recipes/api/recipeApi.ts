import { RecipesEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';

export const getrecipes = async (params: any) => {
   const response = await baseApiInstance.get(
      `${RecipesEndpoints.RECIPES_CATEGORY + params.categoryId}?categoryId=${
         params.categoryId
      }size=${params.size}&page=${params.page}`
   );

   return response.data;
};
export const getDetailRecipe = async (recipeId: any) => {
   const response = await baseApiInstance.get(RecipesEndpoints.RECIPES + '/' + recipeId);
   return response.data;
};
export const addRecipe = async (formData: string) => {
   const response = await baseApiInstance.post(RecipesEndpoints.RECIPES, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
   });
   return response;
};

export const action = async (params: any) => {
   const response = await baseApiInstance.put(
      `v1/actions/${params.actionId}/${params.objectTypeId}/${params.objectId}`
   );
   return response;
};
