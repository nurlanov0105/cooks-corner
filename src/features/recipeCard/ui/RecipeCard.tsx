import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { handleLikenBookmark } from '@/shared/lib/helpers';

import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import likeIcon from '@/shared/assets/imgs/cards/like.svg';
import unlikeIcon from '@/shared/assets/imgs/cards/unlike.svg';
import savedIcon from '@/shared/assets/imgs/cards/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/cards/unsaved.svg';
import { action } from '@/entities/recipes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

// const likeIpdateFunctions = {
//    1: {isLiked: true, likes: likes + 1},
//    10: (oldRecipe: Props) => ({ ...oldRecipe, isLiked: false, likes: oldRecipe.likes - 1 }),
// };
// const bookmarkUpdateFunctions = {
//    2: (oldRecipe: Props) => ({
//       ...oldRecipe,
//       isBookmarked: true,
//       bookmarks: oldRecipe.bookmarks + 1,
//    }),
//    20: (oldRecipe: Props) => ({
//       ...oldRecipe,
//       isBookmarked: false,
//       bookmarks: oldRecipe.bookmarks - 1,
//    }),
// };

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
   const [actionId, setActionId] = useState(1);

   const { mutate: likeAction, isPending: isLikeLoading } = useMutation({
      mutationFn: (params: any) => action(params),
      onSuccess: () => {
         setIsLocalLike(!isLocalLike);
         if (actionId === 1) {
            setLocalLikes(localLikes + 1);
         } else {
            setLocalLikes(localLikes - 1);
         }
      },
      onError: (error) => {
         toast.error('like error');
         console.log(error);
      },
   });
   const { mutate: bookmarkAction, isPending: isBookmarkLoading } = useMutation({
      mutationFn: (params: any) => action(params),
      onSuccess: () => {
         setIsLocalBookmark(!isLocalBookmark);
         if (actionId === 2) {
            setLocalBookmarks(localBookmarks + 1);
         } else {
            setLocalBookmarks(localBookmarks - 1);
         }
      },
      onError: (error) => {
         toast.error('like error');
         console.log(error);
      },
   });

   const handleLikeClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (!isLiked) {
         const params = { actionId: 1, objectTypeId: 2, objectId: recipeId };
         likeAction(params);
         setActionId(params.actionId);
      } else {
         const params = { actionId: 10, objectTypeId: 2, objectId: recipeId };
         likeAction(params);
         setActionId(params.actionId);
      }
   };
   const handleBookmarkClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (!isBookmarked) {
         const params = { actionId: 2, objectTypeId: 2, objectId: recipeId };
         bookmarkAction(params);
         setActionId(params.actionId);
      } else {
         const params = { actionId: 20, objectTypeId: 2, objectId: recipeId };
         bookmarkAction(params);
         setActionId(params.actionId);
      }
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
