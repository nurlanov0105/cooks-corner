import { FC, useCallback } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Categories } from '@/features/categories';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { CardsSection } from '@/widgets/cardsSection';
import { addCategory } from '@/entities/category';

const Home: FC = () => {
   const dispatch = useAppDispatch();
   const category = useAppSelector((state) => state.category.category);

   const onClickCategory = useCallback((category: string) => {
      dispatch(addCategory(category));
   }, []);

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
               <CardsSection cards={[...Array(24)]} />
            </div>
         </section>
      </div>
   );
};

export default Home;
