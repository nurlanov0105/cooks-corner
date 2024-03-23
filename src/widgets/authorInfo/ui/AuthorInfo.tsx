import { FC } from 'react';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { follow, getUserFollowers, getUserFollowing, unFollow } from '@/entities/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { showMobileModal } from '@/widgets/mobileModal';
import { Link } from 'react-router-dom';

interface Props {
   id: string;
   isLoading: boolean;
   isError: any;
   userId: number;
   name: 'string';
   bio: 'string';
   imageUrl: 'string';
   recipes: number;
   followers: number;
   following: number;
   isFollowed: any;
}

const AuthorInfo: FC<Props> = ({
   userId,
   isLoading,
   isError,
   name,
   bio,
   imageUrl,
   recipes,
   followers,
   following,
   isFollowed,
}) => {
   const { isAuth } = useAuth();
   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();

   const { mutate: followMutate, isPending: followLoading } = useMutation({
      mutationFn: (userId: number) => follow(userId),
      onSuccess: (data) => {
         console.log(data);
         queryClient.setQueryData([Tags.USERS, userId], (oldUser: any) => {
            return { ...oldUser, isFollowed: true, followers: followers + 1 };
         });
      },
      onError: (error) => {
         toast.error('follow failed');
         console.log(error);
      },
   });
   const { mutate: unFollowMutate, isPending: unfollowLoading } = useMutation({
      mutationFn: (userId: number) => unFollow(userId),
      onSuccess: (data) => {
         console.log(data);
         queryClient.setQueryData([Tags.USERS, userId], (oldUser: any) => {
            return { ...oldUser, isFollowed: false, followers: followers - 1 };
         });
      },
      onError: (error) => {
         toast.error('unFollow failed');
         console.log(error);
      },
   });

   const handlefollowClick = async () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (!isFollowed) {
         followMutate(userId);
      } else {
         unFollowMutate(userId);
      }
   };

   const { data: followersData, isLoading: followersLoading } = useQuery({
      queryKey: [Tags.USERS, userId, followers],
      queryFn: () => getUserFollowers(Number(userId)),
   });
   const { data: followingData, isLoading: followingLoading } = useQuery({
      queryKey: [Tags.USERS, userId, following],
      queryFn: () => getUserFollowing(Number(userId)),
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
      <div className={styles.author}>
         <div
            className={styles.author__img}
            style={{ backgroundImage: `url(${isError ? '' : isLoading ? '' : imageUrl})` }}></div>
         <h4 className={styles.author__title}>
            {isError ? 'Error' : isLoading ? 'Loading...' : name}
         </h4>
         <div className={styles.author__social}>
            <Link to={`/authors/${userId}`} className={styles.author__box}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : recipes}
               </span>
               <span className={styles.author__explain}>Recipe</span>
            </Link>
            <button className={styles.author__box} onClick={onFollowersClick}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : followers}
               </span>
               <span className={styles.author__explain}>Followers</span>
            </button>
            <button className={styles.author__box} onClick={onFollowingClick}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : following}
               </span>
               <span className={styles.author__explain}>Following</span>
            </button>
         </div>
         <div className={styles.author__about}>
            {isError ? 'Error' : isLoading ? 'Loading...' : bio}
         </div>
         <button
            onClick={handlefollowClick}
            disabled={isError || isLoading || followLoading || unfollowLoading}
            className={classNames(
               'btn',
               styles.author__btn,
               isError ? '' : isLoading ? '' : isFollowed ? styles.author__btn_active : ''
            )}>
            {isLoading ? (
               <span>loading....</span>
            ) : isFollowed ? (
               <span>Unfollow</span>
            ) : (
               <span>Follow</span>
            )}
         </button>
      </div>
   );
};

export default AuthorInfo;
