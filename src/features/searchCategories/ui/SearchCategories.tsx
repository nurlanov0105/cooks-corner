import { FC, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { SearchCategoryTabs } from '@/shared/lib/consts';

interface Props {
   value: string;
   onClickCategory: (category: string) => void;
}

const SearchCategories: FC<Props> = memo(({ value, onClickCategory }) => {
   return (
      <div className={styles.categories}>
         {SearchCategoryTabs.map((category) => (
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
