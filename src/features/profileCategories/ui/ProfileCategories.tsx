import { FC, useState } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { addProfileCategory } from '@/entities/user';

import classNames from 'classnames';
import styles from './styles.module.scss';

const categories = ['My recipe', 'Saved recipe'];
const endpointCategories = {
   'My recipe': 'my',
   'Saved recipe': 'saved',
};

const ProfileCategories: FC = () => {
   const dispatch = useAppDispatch();

   const [activeCategory, setActiveCategory] = useState('My recipe');

   const onClickCategory = (category: string) => {
      setActiveCategory(category);
      dispatch(addProfileCategory(endpointCategories[category as keyof typeof endpointCategories]));
   };

   return (
      <div className={styles.categories}>
         {categories.map((category) => (
            <button
               onClick={() => onClickCategory(category)}
               className={classNames(
                  styles.categories__btn,
                  activeCategory === category ? styles.active : ''
               )}
               key={category}>
               {category}
            </button>
         ))}
      </div>
   );
};

export default ProfileCategories;
