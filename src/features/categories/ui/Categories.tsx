import { FC, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const categories = ['Breakfast', 'Lunch', 'Dinner'];

interface CategoriesProps {
   value: string;
   onClickCategory: (i: string) => void;
}

const Categories: FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
   return (
      <ul className={styles.categories}>
         {categories.map((category) => (
            <li key={category}>
               <button
                  onClick={() => onClickCategory(category)}
                  className={classNames(
                     styles.categories__btn,
                     value === category ? styles.active : ''
                  )}>
                  {category}
               </button>
            </li>
         ))}
      </ul>
   );
});

export default Categories;
