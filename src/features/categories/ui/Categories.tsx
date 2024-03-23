import { FC, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

// const endpointCategories = {
//    breakfasts: 1,
//    soups: 2,
//    seafoods: 3,
//    salads: 4,
//    'main dishes': 5,
//    desserts: 6,
//    beverages: 7,
// };

const categories = [
   'breakfasts',
   'soups',
   'salads',
   'main dishes',
   'desserts',
   'seafoods',
   'beverages',
];

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
         {categories.map((category, i) => (
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
