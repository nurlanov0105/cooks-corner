import { FC, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
   value: string;
   onClickCategory: (category: string) => void;
}

const SearchCategories: FC<Props> = memo(({ value, onClickCategory }) => {
   const categories = ['Chefs', 'Recipes'];
   return (
      <div className={styles.categories}>
         {categories.map((category) => (
            <button
               key={category}
               onClick={() => onClickCategory(category)}
               className={classNames(
                  styles.categories__btn,
                  value === category ? styles.active : ''
               )}>
               {category}
            </button>
         ))}
      </div>
   );
});

export default SearchCategories;
