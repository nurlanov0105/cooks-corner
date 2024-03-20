import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsBackground } from '@/widgets/detailsBackground';
import { DetailsRecipeInfo } from '@/widgets/detailsRecipeInfo';
import { getDetailRecipe } from '@/entities/recipes';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';

const DetailsRecipe: FC = () => {
   const { id } = useParams();

   const { data, isLoading, isError } = useQuery({
      queryKey: [Tags.RECIPES, id],
      queryFn: () => getDetailRecipe(id!),
   });

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
