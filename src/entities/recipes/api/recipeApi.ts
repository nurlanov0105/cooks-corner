import { RecipesEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';
import { IActionParams, IRecipesParams } from '@/shared/lib/types';

export const getrecipes = async (params: IRecipesParams) => {
   const response = await baseApiInstance.get(
      `${RecipesEndpoints.RECIPES_CATEGORY + params.categoryId}?size=${params.size}&page=${
         params.page
      }`
   );

   return response.data;
};
export const getDetailRecipe = async (recipeId: string) => {
   const response = await baseApiInstance.get(RecipesEndpoints.RECIPES + '/' + recipeId);
   return response.data;
};
export const addRecipe = async (formData: string) => {
   const response = await baseApiInstance.post(RecipesEndpoints.RECIPES, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
   });
   return response;
};

export const action = async (params: IActionParams) => {
   const response = await baseApiInstance.put(
      `v1/actions/${params.actionId}/${params.objectTypeId}/${params.objectId}`
   );
   return response;
};
