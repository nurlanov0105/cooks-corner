import { useAppDispatch, useAppSelector } from '@/app/appStore';
import { useCallback } from 'react';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { ProfileInfo } from '@/widgets/profileInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { addProfileCategory } from '@/entities/profile';
import { ProfileCategories } from '@/features/profileCategories';

const Profile = () => {
   const dispatch = useAppDispatch();
   const category = useAppSelector((state) => state.profile.category);
   const onClickCategory = useCallback((category: string) => {
      dispatch(addProfileCategory(category));
   }, []);
   return (
      <div className='container'>
         <h2 className={classNames('h2', styles.title)}>Profile</h2>
         <ProfileInfo image='srtin' />
         <div className={styles.categories}>
            <ProfileCategories value={category} onClickCategory={onClickCategory} />
         </div>

         <CardsSection cards={[...Array(24)]} />
      </div>
   );
};

export default Profile;
