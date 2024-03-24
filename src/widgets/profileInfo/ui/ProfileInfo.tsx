import { FC } from 'react';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { addProfileData, getUserFollowers, getUserFollowing } from '@/entities/user';

import classNames from 'classnames';
import styles from './styles.module.scss';
import { showMobileModal } from '@/widgets/mobileModal';
import { Tags } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

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
   userId,
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

   const { data: followersData, isLoading: followersLoading } = useQuery({
      queryKey: [Tags.USERS, userId, followers],
      queryFn: () => getUserFollowers(userId),
   });
   const { data: followingData, isLoading: followingLoading } = useQuery({
      queryKey: [Tags.USERS, userId, following],
      queryFn: () => getUserFollowing(userId),
   });

   const onFollowersClick = () => {
      const props = {
         componentName: 'FollowsModal',
         name: 'Followers',
         data: followersData?.data.content,
         isLoading: followersLoading,
      };
      dispatch(showMobileModal(props));
   };
   const onFollowingClick = () => {
      const props = {
         componentName: 'FollowsModal',
         name: 'Following',
         data: followingData?.data.content,
         isLoading: followingLoading,
      };
      dispatch(showMobileModal(props));
   };

   return (
      <div className={styles.profile}>
         <div
            className={styles.profile__img}
            style={{ backgroundImage: `url(${isError ? '' : isLoading ? '' : imageUrl})` }}></div>
         <div className={styles.profile__body}>
            <div className={styles.profile__social}>
               <div
                  className={styles.profile__imgMobile}
                  style={{
                     backgroundImage: `url(${isError ? '' : isLoading ? '' : imageUrl})`,
                  }}></div>
               <button className={styles.profile__box}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : recipes}
                  </span>
                  <span className={styles.profile__explain}>Recipe</span>
               </button>
               <button className={styles.profile__box} onClick={onFollowersClick}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : followers}
                  </span>
                  <span className={styles.profile__explain}>Followers</span>
               </button>
               <button className={styles.profile__box} onClick={onFollowingClick}>
                  <span className={styles.profile__amount}>
                     {isError ? '0' : isLoading ? '0' : following}
                  </span>
                  <span className={styles.profile__explain}>Following</span>
               </button>
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
