import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { Categories } from '@/features/categories';
import { CardsSection } from '@/widgets/cardsSection';
import { addCurrentPage, addRecipeCategory, addTotalPages, getrecipes } from '@/entities/recipes';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { useAuth } from '@/shared/lib/hooks';
import { Pagaination } from '@/features/pagination';
import { getUserInfoFomLS } from '@/shared/lib/helpers';
import { Link } from 'react-router-dom';

const Home: FC = () => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAuth();
   const { name } = getUserInfoFomLS();
   const { categoryId, limit, currentPage, totalPages } = useAppSelector((state) => state.recipe);

   const {
      data: recipes,
      isLoading,
      isSuccess,
   } = useQuery({
      queryKey: [Tags.RECIPES, categoryId, limit, currentPage, isAuth],
      queryFn: () => getrecipes({ categoryId, size: limit, page: currentPage }),
   });

   const onClickCategory = useCallback((categoryId: number) => {
      dispatch(addRecipeCategory(categoryId));
   }, []);

   useEffect(() => {
      if (isSuccess) {
         dispatch(addTotalPages(recipes.totalPages));
      }
   }, [isSuccess]);

   const onChangePage = (num: number) => {
      dispatch(addCurrentPage(num));
   };

   const preparedCards = isLoading ? [...Array(12)] : recipes.content;

   return (
      <div className={classNames('container', styles.container)}>
         <section className={styles.section}>
            <h1 className={classNames('h2', styles.section__title)}>
               Hi,{' '}
               {name ? (
                  name
               ) : (
                  <>
                     <Link to='/signin' className='accent-color'>
                        Signin
                     </Link>{' '}
                     or{' '}
                     <Link to='/signup' className='accent-color'>
                        Signup
                     </Link>
                  </>
               )}
            </h1>
            <div className={styles.section__col}>
               <div className={styles.section__category}>
                  <h2 className='h2'>Category</h2>
                  <Categories value={categoryId} onClickCategory={onClickCategory} />
               </div>
               <CardsSection cards={preparedCards} isLoading={isLoading} />
            </div>
         </section>
         <div className={styles.container__pagination}>
            <Pagaination
               currentPage={currentPage}
               onChangePages={(num: number) => onChangePage(num)}
               totalPages={totalPages}
            />
         </div>
      </div>
   );
};

export default Home;
