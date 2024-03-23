import recipeSLice, {
   addRecipeCategory,
   setRecipes,
   addCurrentPage,
   addTotalPages,
} from './model/recipeSLice';
import { getrecipes, getDetailRecipe, addRecipe, action } from './api/recipeApi';

export {
   recipeSLice,
   addRecipeCategory,
   setRecipes,
   getrecipes,
   getDetailRecipe,
   addRecipe,
   action,
   addCurrentPage,
   addTotalPages,
};
