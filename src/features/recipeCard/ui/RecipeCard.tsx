import styles from './styles.module.scss';
import { FC, useState } from 'react';

import likeIcon from '@/shared/assets/imgs/cards/like.svg';
import unlikeIcon from '@/shared/assets/imgs/cards/unlike.svg';
import savedIcon from '@/shared/assets/imgs/cards/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/cards/unsaved.svg';
import { Link } from 'react-router-dom';
import {
   useBookmarkRecipeMutation,
   useDislikeRecipeMutation,
   useLikeRecipeMutation,
   useRemoveBookmarkRecipeMutation,
} from '@/entities/recipes';
import { toast } from 'react-toastify';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import { handleLikenBookmark } from '@/shared/lib/helpers';

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

   const [like, { isLoading: isLoadingLike }] = useLikeRecipeMutation();
   const [dislike, { isLoading: isLoadingDislike }] = useDislikeRecipeMutation();
   const [bookmark, { isLoading: isLoadingBookmark }] = useBookmarkRecipeMutation();
   const [removeBookmark, { isLoading: isLoadingRemoveMark }] = useRemoveBookmarkRecipeMutation();

   const [localIsLiked, setLocalIsLiked] = useState(isLiked);
   const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked);
   const [localLikes, setLocalLikes] = useState(likes);
   const [localBookmarks, setLocalBookmarks] = useState(bookmarks);

   const handleLikeClick = () => {
      handleLikenBookmark({
         isItem: localIsLiked,
         setLocalItem: setLocalIsLiked,
         item: like,
         removeItem: dislike,
         dispatch: dispatch,
         showModal: showModal,
         isAuth: isAuth,
         toast: toast,
         recipeId: recipeId,
         count: localLikes,
         setCount: setLocalLikes,
      });
   };
   const handleBookmarkClick = () => {
      handleLikenBookmark({
         isItem: localIsBookmarked,
         setLocalItem: setLocalIsBookmarked,
         item: bookmark,
         removeItem: removeBookmark,
         dispatch: dispatch,
         showModal: showModal,
         isAuth: isAuth,
         toast: toast,
         recipeId: recipeId,
         count: localBookmarks,
         setCount: setLocalBookmarks,
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
                  disabled={isLoadingLike || isLoadingDislike}
                  onClick={handleLikeClick}>
                  <img
                     className={styles.card__icon}
                     src={localIsLiked ? likeIcon : unlikeIcon}
                     alt='icon'
                  />
                  <span className={styles.card__count}>{localLikes}</span>
               </button>
               <button
                  className={styles.card__box}
                  disabled={isLoadingBookmark || isLoadingRemoveMark}
                  onClick={handleBookmarkClick}>
                  <img
                     className={styles.card__icon}
                     src={localIsBookmarked ? savedIcon : unsavedIcon}
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
