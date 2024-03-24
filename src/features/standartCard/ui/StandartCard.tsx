import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { action } from '@/entities/recipes';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';
import likeIcon from '@/shared/assets/imgs/search/like.svg';
import unlikeIcon from '@/shared/assets/imgs/search/unlike.svg';
import savedIcon from '@/shared/assets/imgs/search/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/search/unsaved.svg';
import { showModal } from '@/widgets/modal';
import { handleActionClick } from '@/shared/lib/helpers';
import { Tags } from '@/shared/api';

interface Props {
   imageUrl: string;
   title: string;
   author: string;
   likes: number;
   bookmarks: number;
   isLiked: boolean;
   isBookmarked: boolean;
   recipeId: number;
}
const StandartCard: FC<Props> = ({
   imageUrl,
   title,
   author,
   likes,
   bookmarks,
   isLiked,
   isBookmarked,
   recipeId,
}) => {
   const { isAuth } = useAuth();
   const dispatch = useAppDispatch();
   const [isLocalLike, setIsLocalLike] = useState<boolean>(isLiked);
   const [isLocalBookmark, setIsLocalBookmark] = useState<boolean>(isBookmarked);
   const [localLikes, setLocalLikes] = useState(likes);
   const [localBookmarks, setLocalBookmarks] = useState(bookmarks);
   const queryClient = useQueryClient();

   const { mutate: actionLike, isPending: isLikeLoading } = useMutation({
      mutationFn: action,
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries([Tags.RECIPES]);
      },
      onError: (error) => {
         toast.error('like error');
         console.log(error);
      },
   });

   const { mutate: actionBookmark, isPending: isBookmarkLoading } = useMutation({
      mutationFn: action,
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries([Tags.RECIPES]);
      },
      onError: (error) => {
         toast.error('save error');
         console.log(error);
      },
   });

   const handleLikeClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (isLikeLoading) {
         return;
      }
      handleActionClick({
         isLocalAction: isLocalLike,
         setLocalAction: setIsLocalLike,
         localCount: localLikes,
         setLocalCount: setLocalLikes,
         actionId: 10,
         newActionId: 1,
         recipeId,
         actionMutate: actionLike,
         objectTypeId: 2,
      });
   };

   const handleBookmarkClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (isBookmarkLoading) {
         return;
      }

      handleActionClick({
         isLocalAction: isLocalBookmark,
         setLocalAction: setIsLocalBookmark,
         localCount: localBookmarks,
         setLocalCount: setLocalBookmarks,
         actionId: 20,
         newActionId: 2,
         recipeId,
         actionMutate: actionBookmark,
         objectTypeId: 2,
      });
   };

   return (
      <div className={styles.card}>
         <Link
            to={`/details-recipe/${recipeId}`}
            className={styles.card__img}
            style={{ backgroundImage: `url(${imageUrl})` }}></Link>
         <Link to={`/details-recipe/${recipeId}`} className={styles.card__title}>
            {title}
         </Link>
         <Link to={`/details-recipe/${recipeId}`} className={styles.card__author}>
            by {author}
         </Link>
         <div className={styles.card__row}>
            <button
               disabled={isLikeLoading}
               className={styles.card__actions}
               onClick={handleLikeClick}>
               <img src={isLocalLike ? likeIcon : unlikeIcon} alt='like icon' />
               <span>{localLikes}</span>
            </button>
            <button
               disabled={isBookmarkLoading}
               className={styles.card__actions}
               onClick={handleBookmarkClick}>
               <img src={isLocalBookmark ? savedIcon : unsavedIcon} alt='save icon' />
               <span>{localBookmarks}</span>
            </button>
         </div>
      </div>
   );
};

export default StandartCard;
