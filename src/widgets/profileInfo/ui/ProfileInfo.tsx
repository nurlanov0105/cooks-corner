import { FC } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { addProfileData } from '@/entities/user';

import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
   isLoading: boolean;
   isError: boolean;
   userId: number;
   name: 'string';
   bio: 'string';
   imageUrl: 'string';
   recipes: number;
   followers: number;
   following: number;
   isFollowed: any;
}

const ProfileInfo: FC<Props> = ({
   isLoading,
   isError,
   // userId,
   name,
   bio,
   imageUrl,
   recipes,
   followers,
   following,
   // isFollowed,
}) => {
   const dispatch = useAppDispatch();

   const handleManageProfile = () => {
      dispatch(addProfileData({ name, bio }));
      dispatch(showModal('ManageProfileModal'));
   };

   return (
      <div className={styles.profile}>
         <div
            className={styles.profile__img}
            style={{ backgroundImage: `url(${isError ? '' : isLoading ? '' : imageUrl})` }}></div>
         <div className={styles.profile__body}>
            <div className={styles.profile__social}>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : recipes}
                  </span>
                  <span className={styles.profile__explain}>Recipe</span>
               </div>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : followers}
                  </span>
                  <span className={styles.profile__explain}>Followers</span>
               </div>
               <div className={styles.profile__box}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : following}
                  </span>
                  <span className={styles.profile__explain}>Following</span>
               </div>
            </div>
            <h4 className={styles.profile__title}>
               {isError ? 'Error' : isLoading ? 'Loading...' : name}
            </h4>
            <div className={styles.profile__about}>
               {isError ? 'Error' : isLoading ? 'Loading...' : bio}
            </div>
            <button
               className={classNames('btn', styles.profile__btn)}
               onClick={handleManageProfile}>
               {isError ? 'Error' : isLoading ? 'Loading...' : <span>Manage Profile</span>}
            </button>
         </div>
      </div>
   );
};

export default ProfileInfo;
