import { FC } from 'react';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { ProfilecategoryTabs } from '@/shared/lib/consts';

interface Props {
   value: string;
   onClickCategory: (category: string) => void;
}

const ProfileCategories: FC<Props> = ({ value, onClickCategory }) => {
   const onClick = (category: string) => {
      onClickCategory(category);
   };

   return (
      <div className={styles.categories}>
         {ProfilecategoryTabs.map((category) => (
            <button
               onClick={() => onClick(category.endpointName)}
               className={classNames(
                  styles.categories__btn,
                  value === category.endpointName ? styles.active : ''
               )}
               key={category.endpointName}>
               {category.name}
            </button>
         ))}
      </div>
   );
};

export default ProfileCategories;
