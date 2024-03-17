import { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { useFollowMutation, useUnfollowMutation } from '@/entities/users';
import { toast } from 'react-toastify';

interface Props {
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

   const [follow, { isLoading: followLoading }] = useFollowMutation();
   const [unfollow, { isLoading: unfollowLoading }] = useUnfollowMutation();

   const handlefollowClick = async () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (!isFollowed) {
         try {
            const response: any = await follow({ userId });
            if (response.error) {
               console.log(response.error);
               toast.error('Error try follow');
            } else {
               console.log(response);
            }
         } catch (error) {
            console.log(error);
            toast.error('error follow');
         }
      } else {
         try {
            const response: any = await unfollow({ userId });
            if (response.error) {
               console.log(response.error);
               toast.error('Error try unfollow');
            } else {
               console.log(response);
            }
         } catch (error) {
            console.log(error);
            toast.error('error unfollow');
         }
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
