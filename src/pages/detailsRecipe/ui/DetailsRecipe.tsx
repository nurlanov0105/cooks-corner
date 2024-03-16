import { useGetDetailRecipeQuery } from '@/entities/recipes';
import { DetailsBackground } from '@/widgets/detailsBackground';
import { DetailsRecipeInfo } from '@/widgets/detailsRecipeInfo';
import { useParams } from 'react-router-dom';

const DetailsRecipe = () => {
   const { id } = useParams();
   const { data, isLoading, isError } = useGetDetailRecipeQuery({ recipeId: id });

   return isError ? (
      <h1 className='h1'>Error</h1>
   ) : isLoading ? (
      <h1 className='h1'>Loading...</h1>
   ) : (
      <>
         <DetailsBackground imageUrl={data.imageUrl} />
         <DetailsRecipeInfo {...data} isLoading={isLoading} />
      </>
   );
};

export default DetailsRecipe;
