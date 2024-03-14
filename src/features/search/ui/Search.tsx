import { FC, useState } from 'react';
import styles from './styles.module.scss';

import searchIcon from '@/shared/assets/imgs/search/search.svg';
import crossIcon from '@/shared/assets/imgs/search/cross.svg';
import classNames from 'classnames';

interface Props {
   handleChefsSearch?: (value: string) => void;
   handleRecipesSearch?: (value: string) => void;
   type: string;
}

const Search: FC<Props> = ({ handleChefsSearch, handleRecipesSearch, type }) => {
   const [chefsSearchValue, setChefsSearchValue] = useState('');
   const [recipesSearchValue, setRecipesSearchValue] = useState('');

   const onChefsInputChange = (e: any) => {
      setChefsSearchValue(e.target.value);
   };

   const onChefsSearchClick = () => {
      if (handleChefsSearch) {
         handleChefsSearch(chefsSearchValue);
      }
   };
   const onChefsCrossClick = () => {
      setChefsSearchValue('');
   };

   const onRecipesInputChange = (e: any) => {
      setRecipesSearchValue(e.target.value);
   };

   const onRecipesSearchClick = () => {
      if (handleRecipesSearch) {
         handleRecipesSearch(recipesSearchValue);
      }
   };
   const onRecipesCrossClick = () => {
      setRecipesSearchValue('');
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
            <img
               src={searchIcon}
               className={styles.search__img}
               alt='search icon'
               onClick={onChefsSearchClick}
            />
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
            <img
               src={searchIcon}
               className={styles.search__img}
               alt='search icon'
               onClick={onRecipesSearchClick}
            />
         )}
      </label>
   );
};

export default Search;
