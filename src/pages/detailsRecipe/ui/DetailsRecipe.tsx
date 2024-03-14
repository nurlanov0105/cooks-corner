import { DetailsBackground } from '@/widgets/detailsBackground';
import { DetailsRecipeInfo } from '@/widgets/detailsRecipeInfo';

const DetailsRecipe = () => {
   return (
      <>
         <DetailsBackground imageUrl='some link' />

         <DetailsRecipeInfo isLiked={false} isSaved={false} />
      </>
   );
};

export default DetailsRecipe;
