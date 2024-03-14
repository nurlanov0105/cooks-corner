import classNames from 'classnames';
import styles from './styles.module.scss';
import { useCallback } from 'react';
import { SearchCategories } from '@/features/searchCategories';
import { Search } from '@/features/search';
import { ChefsCard } from '@/features/chefsCard';
import { StandartCard } from '@/features/standartCard';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { addSearchCategory } from '@/entities/search';
import { AddRecipeBtn } from '@/entities/addRecipeBtn';

const SearchPage = () => {
   const dispatch = useAppDispatch();
   const category = useAppSelector((state) => state.search.category);

   const onClickCategory = useCallback((category: string) => {
      dispatch(addSearchCategory(category));
   }, []);

   const handleChefsSearch = (searchValue: string) => {
      console.log(searchValue);
   };

   const handleRecipesSearch = (searchValue: string) => {
      console.log(searchValue);
   };

   return (
      <div className={classNames('container', styles.search)}>
         <h2 className={classNames('h2', styles.search__title)}>What to eat today?</h2>
         <div className={styles.search__category}>
            <SearchCategories value={category} onClickCategory={onClickCategory} />
         </div>

         <div className={styles.search__input}>
            {category === 'Chefs' ? (
               <Search handleChefsSearch={handleChefsSearch} type={category} />
            ) : (
               <Search handleRecipesSearch={handleRecipesSearch} type={category} />
            )}
         </div>
         <p className={styles.search__result}>Search results</p>
         {/* <p className={styles.search__notfound}>No results found</p> */}
         <div className={styles.search__section}>
            {category === 'Chefs' ? (
               <div className={styles.search__row}>
                  {[...Array(24)].map((_, i) => (
                     <ChefsCard image='sd' key={i} />
                  ))}
               </div>
            ) : (
               <div className={classNames(styles.search__row, styles.search__row_mt)}>
                  {[...Array(24)].map((_, i) => (
                     <StandartCard image='sd' isLiked={false} isSaved={false} key={i} />
                  ))}
               </div>
            )}
         </div>
         <div className={styles.search__btn}>
            <AddRecipeBtn />
         </div>
      </div>
   );
};

export default SearchPage;
