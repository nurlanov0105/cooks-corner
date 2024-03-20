import { RecipesEndpoints } from '@/shared/api';
import { baseApiInstance } from '@/shared/api/instance';

export const getrecipes = async (params: any) => {
   try {
      const { data } = await baseApiInstance.get(
         `${RecipesEndpoints.RECIPES}?query=category:${params.category}&size=${params.size}&page=${params.page}`
      );

      return data;
   } catch (error) {
      console.log(error);
   }
};
export const getDetailRecipe = async (recipeId: string) => {
   try {
      const { data } = await baseApiInstance.get(RecipesEndpoints.RECIPES + '/' + recipeId);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const addRecipe = async (formData: string) => {
   try {
      const { data } = await baseApiInstance.post(RecipesEndpoints.RECIPES, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const action = async (params: any) => {
   try {
      const { data } = await baseApiInstance.put(
         `v1/actions/${params.actionId}/${params.objectTypeId}/${params.objectId}`
      );
      return data;
   } catch (error) {
      console.log(error);
   }
};
