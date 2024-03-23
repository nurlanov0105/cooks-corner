import { FC } from 'react';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { follow, unFollow } from '@/entities/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tags } from '@/shared/api';

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
   id,
   isLoading,
   isError,
   userId,
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
         queryClient.setQueryData([Tags.USERS, id], (oldUser: any) => {
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
         queryClient.setQueryData([Tags.USERS, id], (oldUser: any) => {
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

   return (
      <div className={styles.author}>
         <div
            className={styles.author__img}
            style={{ backgroundImage: `url(${isError ? '' : isLoading ? '' : imageUrl})` }}></div>
         <h4 className={styles.author__title}>
            {isError ? 'Error' : isLoading ? 'Loading...' : name}
         </h4>
         <div className={styles.author__social}>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : recipes}
               </span>
               <span className={styles.author__explain}>Recipe</span>
            </div>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : followers}
               </span>
               <span className={styles.author__explain}>Followers</span>
            </div>
            <div className={styles.author__box}>
               <span className={styles.author__amount}>
                  {isError ? '0' : isLoading ? '0' : following}
               </span>
               <span className={styles.author__explain}>Following</span>
            </div>
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
