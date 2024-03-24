import { FC, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { RecipesCategories } from '@/shared/lib/consts';

interface CategoriesProps {
   value: number;
   onClickCategory: (i: number) => void;
}

const Categories: FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
   const handelClick = (categoryId: number) => {
      onClickCategory(categoryId);
   };

   return (
      <ul className={styles.categories}>
         {RecipesCategories.map((category, i) => (
            <li key={category}>
               <button
                  onClick={() => handelClick(i + 1)}
                  className={classNames(
                     styles.categories__btn,
                     i + 1 === value ? styles.active : ''
                  )}>
                  {category}
               </button>
            </li>
         ))}
      </ul>
   );
});

export default Categories;
