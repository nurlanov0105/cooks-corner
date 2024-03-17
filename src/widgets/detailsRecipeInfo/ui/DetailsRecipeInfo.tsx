import classNames from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import wathIcon from '@/shared/assets/imgs/detailsRecipe/watches.svg';
import likeIcon from '@/shared/assets/imgs/detailsRecipe/like.svg';
import unlikeIcon from '@/shared/assets/imgs/detailsRecipe/unlike.svg';
import saveIcon from '@/shared/assets/imgs/detailsRecipe/save.svg';
import unsaveIcon from '@/shared/assets/imgs/detailsRecipe/unsave.svg';
import { FC, useState } from 'react';
import { handleLikenBookmark } from '@/shared/lib/helpers';
import { toast } from 'react-toastify';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { showModal } from '@/widgets/modal';
import {
   useBookmarkRecipeMutation,
   useDislikeRecipeMutation,
   useLikeRecipeMutation,
   useRemoveBookmarkRecipeMutation,
} from '@/entities/recipes';

interface Props {
   recipeId: number;
   title: 'string';
   author: 'string';
   authorId: number;
   cookingTimeMinutes: number;
   difficulty: 'string';
   description: 'string';
   likes: number;
   bookmarks: number;
   isLiked: true;
   isBookmarked: true;
   ingredients: [
      {
         ingredient: 'string';
         amount: number;
         measureUnit: 'string';
      }
   ];
   isLoading: boolean;
}

const DetailsRecipeInfo: FC<Props> = ({
   // isLoading,
   recipeId,
   title,
   author,
   authorId,
   cookingTimeMinutes,
   difficulty,
   description,
   likes,
   // bookmarks,
   isLiked,
   isBookmarked,
   ingredients,
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
   // const [localBookmarks, setLocalBookmarks] = useState(bookmarks);

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
      });
   };
   return (
      <section className={styles.section}>
         <div className={styles.section__top}>
            <h2 className={classNames('h2', styles.section__title)}>{title}</h2>
            <Link to={`/authors/${authorId}`} className={styles.section__author}>
               by {author}
            </Link>
         </div>
         <div className={styles.section__management}>
            <div className={styles.section__time}>
               <img src={wathIcon} alt='watch icon' />
               <span>{cookingTimeMinutes} min</span>
            </div>
            <span className={styles.section__level}>{difficulty}</span>
         </div>
         <div className={styles.section__actions}>
            <button
               onClick={handleLikeClick}
               className={styles.section__btn}
               disabled={isLoadingLike || isLoadingDislike}>
               <img src={localIsLiked ? likeIcon : unlikeIcon} alt='icon like' />
               <span>{localLikes} likes</span>
            </button>
            <button
               onClick={handleBookmarkClick}
               className={styles.section__btn}
               disabled={isLoadingBookmark || isLoadingRemoveMark}>
               <img src={localIsBookmarked ? saveIcon : unsaveIcon} alt='icon save' />
            </button>
         </div>
         <div className={styles.section__description}>
            <h3 className={styles.section__subtitle}>Description</h3>
            <p>{description}</p>
         </div>
         <div className={styles.section__ingredients}>
            <h3 className={styles.section__subtitle}>Ingredients</h3>
            <ul className={styles.section__list}>
               {ingredients.map((item, i) => (
                  <li className={styles.section__item} key={i}>
                     <h5>{item.ingredient}</h5>
                     <p>
                        <span>{item.amount}</span>
                        <span>{item.measureUnit}</span>
                     </p>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};

export default DetailsRecipeInfo;
