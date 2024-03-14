import classNames from 'classnames';
import styles from './styles.module.scss';
import { FC, memo } from 'react';

interface Props {
   value: string;
   onClickCategory: (category: string) => void;
}

const ProfileCategories: FC<Props> = memo(({ value, onClickCategory }) => {
   const categories = ['My recipe', 'Saved recipe'];
   return (
      <div className={styles.categories}>
         {categories.map((category) => (
            <button
               onClick={() => onClickCategory(category)}
               className={classNames(
                  styles.categories__btn,
                  value === category ? styles.active : ''
               )}
               key={category}>
               {category}
            </button>
         ))}
      </div>
   );
});

export default ProfileCategories;
