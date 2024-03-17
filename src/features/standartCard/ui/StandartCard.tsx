import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import likeIcon from '@/shared/assets/imgs/search/like.svg';
import unlikeIcon from '@/shared/assets/imgs/search/unlike.svg';
import savedIcon from '@/shared/assets/imgs/search/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/search/unsaved.svg';
import { handleLikenBookmark } from '@/shared/lib/helpers';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import {
   useBookmarkRecipeMutation,
   useDislikeRecipeMutation,
   useLikeRecipeMutation,
   useRemoveBookmarkRecipeMutation,
} from '@/entities/recipes';
import { showModal } from '@/widgets/modal';
import { toast } from 'react-toastify';
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
      <div className={styles.card}>
         <Link
            to={`/details-recipe/${recipeId}`}
            className={styles.card__img}
            style={{ backgroundImage: `url(${imageUrl})` }}></Link>
         <h4 className={styles.card__title}>{title}</h4>
         <Link to={`/details-recipe/${recipeId}`} className={styles.card__author}>
            by {author}
         </Link>
         <div className={styles.card__row}>
            <button
               disabled={isLoadingLike || isLoadingDislike}
               className={styles.card__actions}
               onClick={handleLikeClick}>
               <img src={localIsLiked ? likeIcon : unlikeIcon} alt='like icon' />
               <span>{localLikes}</span>
            </button>
            <button
               disabled={isLoadingBookmark || isLoadingRemoveMark}
               className={styles.card__actions}
               onClick={handleBookmarkClick}>
               <img src={localIsBookmarked ? savedIcon : unsavedIcon} alt='save icon' />
               <span>{localBookmarks}</span>
            </button>
         </div>
      </div>
   );
};

export default StandartCard;
