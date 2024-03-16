import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';

import searchIcon from '@/shared/assets/imgs/search/search.svg';
import crossIcon from '@/shared/assets/imgs/search/cross.svg';
import classNames from 'classnames';
import { useDebounce } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { setChefsSearchParams, setRecipesSearchParams } from '@/entities/search';

interface Props {
   handleChefsSearch?: (value: string) => void;
   handleRecipesSearch?: (value: string) => void;
   type: string;
}

const Search: FC<Props> = ({ type }) => {
   const dispatch = useAppDispatch();
   const [chefsSearchValue, setChefsSearchValue] = useState('');
   const [recipesSearchValue, setRecipesSearchValue] = useState('');

   const debouncedChefsSearchValue = useDebounce(chefsSearchValue);
   const debouncedRecipesSearchValue = useDebounce(recipesSearchValue);

   useEffect(() => {
      dispatch(setChefsSearchParams(debouncedChefsSearchValue));
   }, [debouncedChefsSearchValue]);

   useEffect(() => {
      dispatch(setRecipesSearchParams(debouncedRecipesSearchValue));
   }, [debouncedRecipesSearchValue]);

   const onChefsInputChange = (e: any) => {
      setChefsSearchValue(e.target.value);
   };

   const onRecipesInputChange = (e: any) => {
      setRecipesSearchValue(e.target.value);
   };

   const onRecipesCrossClick = () => {
      setRecipesSearchValue('');
   };
   const onChefsCrossClick = () => {
      setChefsSearchValue('');
   };

   return type === 'Chefs' ? (
      <label className={styles.search}>
         <input
            type='text'
            placeholder='Search chefs'
            value={chefsSearchValue}
            className={classNames(styles.search__input, chefsSearchValue ? styles.active : '')}
            onChange={onChefsInputChange}
         />
         {chefsSearchValue ? (
            <img
               src={crossIcon}
               className={styles.search__img}
               alt='close icon'
               onClick={onChefsCrossClick}
            />
         ) : (
            <img src={searchIcon} className={styles.search__img} alt='search icon' />
         )}
      </label>
   ) : (
      <label className={styles.search}>
         <input
            type='text'
            placeholder='Search recipes'
            value={recipesSearchValue}
            className={classNames(styles.search__input, recipesSearchValue ? styles.active : '')}
            onChange={onRecipesInputChange}
         />
         {recipesSearchValue ? (
            <img
               src={crossIcon}
               className={styles.search__img}
               alt='close icon'
               onClick={onRecipesCrossClick}
            />
         ) : (
            <img src={searchIcon} className={styles.search__img} alt='search icon' />
         )}
      </label>
   );
};

export default Search;
