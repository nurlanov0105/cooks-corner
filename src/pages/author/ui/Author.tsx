import { BackArrow } from '@/entities/backArrow';
import styles from './styles.module.scss';
import { AuthorInfo } from '@/widgets/authorInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { useParams } from 'react-router-dom';
import { useGetUserQuery, useGetUserRecipesQuery } from '@/entities/users';

const Author = () => {
   const { id } = useParams();

   const { data, isLoading, isError } = useGetUserQuery({ userId: id });
   const {
      data: userRecipes,
      isLoading: recipesLoading,
      isError: recipesError,
   } = useGetUserRecipesQuery({ userId: id });

   const preparedRecipes = isLoading ? [...Array(12)] : userRecipes?.content || [];

   return (
      <div className='container'>
         <BackArrow />
         <AuthorInfo {...data} isLoading={isLoading} isError={isError} />
         <div className={styles.row}>
            {recipesError ? (
               'Error'
            ) : (
               <CardsSection cards={preparedRecipes} isLoading={recipesLoading} isCenter={true} />
            )}
         </div>
      </div>
   );
};

export default Author;
