import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { Categories } from '@/features/categories';
import { CardsSection } from '@/widgets/cardsSection';
import { addRecipeCategory, getrecipes } from '@/entities/recipes';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';

const Home: FC = () => {
   const dispatch = useAppDispatch();
   const { category, limit, currentPage } = useAppSelector((state) => state.recipe);

   const { data: recipes, isLoading } = useQuery({
      queryKey: [Tags.RECIPES, category, limit, currentPage],
      queryFn: () => getrecipes({ category: category, size: limit, page: currentPage }),
   });

   // const { isLoading } = useGetRecipesQuery({ size: limit, page: currentPage, category });

   const onClickCategory = useCallback((category: string) => {
      dispatch(addRecipeCategory(category));
   }, []);

   const preparedCards = isLoading ? [...Array(12)] : recipes.content;

   return (
      <div className='container'>
         <section className={styles.section}>
            <h1 className={classNames('h2', styles.section__title)}>
               Hi, Sarthak. UI Designer & Cook
            </h1>
            <div className={styles.section__col}>
               <div className={styles.section__category}>
                  <h2 className='h2'>Category</h2>
                  <Categories value={category} onClickCategory={onClickCategory} />
               </div>
               <CardsSection cards={preparedCards} isLoading={isLoading} />
            </div>
         </section>
      </div>
   );
};

export default Home;
