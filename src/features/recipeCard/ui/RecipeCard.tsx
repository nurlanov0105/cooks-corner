import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';

import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import likeIcon from '@/shared/assets/imgs/cards/like.svg';
import unlikeIcon from '@/shared/assets/imgs/cards/unlike.svg';
import savedIcon from '@/shared/assets/imgs/cards/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/cards/unsaved.svg';
import { action } from '@/entities/recipes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { handleActionClick } from '@/shared/lib/helpers';

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

const RecipeCard: FC<Props> = ({
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
   const [isLocalLike, setIsLocalLike] = useState(isLiked);
   const [isLocalBookmark, setIsLocalBookmark] = useState(isBookmarked);
   const [localLikes, setLocalLikes] = useState(likes);
   const [localBookmarks, setLocalBookmarks] = useState(bookmarks);
   const queryClient = useQueryClient();

   const { mutate: actionLike, isPending: isLikeLoading } = useMutation({
      mutationFn: action,
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries([Tags.RECIPES, recipeId]);
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
         queryClient.invalidateQueries([Tags.RECIPES, recipeId]);
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
      <div className={styles.card} style={{ backgroundImage: `url(${imageUrl})` }}>
         <Link to={`/details-recipe/${recipeId}`} className={styles.card__fully}></Link>
         <div className={styles.card__block}>
            <Link to={`/details-recipe/${recipeId}`} className={styles.card__title}>
               {title}
            </Link>
            <Link to={`/details-recipe/${recipeId}`} className={styles.card__author}>
               by {author}
            </Link>
            <div className={styles.card__row}>
               <button
                  className={styles.card__box}
                  disabled={isLikeLoading}
                  onClick={handleLikeClick}>
                  <img
                     className={styles.card__icon}
                     src={isLocalLike ? likeIcon : unlikeIcon}
                     alt='icon'
                  />
                  <span className={styles.card__count}>{localLikes}</span>
               </button>
               <button
                  className={styles.card__box}
                  disabled={isBookmarkLoading}
                  onClick={handleBookmarkClick}>
                  <img
                     className={styles.card__icon}
                     src={isLocalBookmark ? savedIcon : unsavedIcon}
                     alt='icon'
                  />

                  <span className={styles.card__count}>{localBookmarks}</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default RecipeCard;
