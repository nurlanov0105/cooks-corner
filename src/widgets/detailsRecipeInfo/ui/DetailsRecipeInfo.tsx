import { FC, useState } from 'react';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { action } from '@/entities/recipes';
import { toast } from 'react-toastify';
import { showModal } from '@/widgets/modal';
import { handleActionClick } from '@/shared/lib/helpers';

import classNames from 'classnames';
import styles from './styles.module.scss';

import wathIcon from '@/shared/assets/imgs/detailsRecipe/watches.svg';
import likeIcon from '@/shared/assets/imgs/detailsRecipe/like.svg';
import unlikeIcon from '@/shared/assets/imgs/detailsRecipe/unlike.svg';
import saveIcon from '@/shared/assets/imgs/detailsRecipe/save.svg';
import unsaveIcon from '@/shared/assets/imgs/detailsRecipe/unsave.svg';
import { Link } from 'react-router-dom';
import { Tags } from '@/shared/api';

interface Props {
   id: number;
   recipeId: number;
   title: 'string';
   author: 'string';
   authorId: number;
   cookingTimeMinutes: number;
   difficulty: 'string';
   description: 'string';
   likes: number;
   isLiked: true;
   isBookmarked: true;
   bookmarks: number;
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
   id,
   recipeId,
   title,
   author,
   authorId,
   cookingTimeMinutes,
   difficulty,
   description,
   likes,
   isLiked,
   isBookmarked,
   bookmarks,
   ingredients,
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
         queryClient.invalidateQueries([Tags.RECIPES, id]);
         // queryClient.setQueryData([Tags.RECIPES, id], (oldRecipe: any) => {
         //    return {
         //       ...oldRecipe,
         //       isLiked: isLiked ? false : true,
         //       likes: isLiked ? likes - 1 : likes + 1,
         //    };
         // });
      },
      onMutate: () => {
         // Очистка кэша
         queryClient.clear();
      },
      onError: (error) => {
         toast.error('like error');
         console.log(error);
      },
   });

   const { mutate: actionBookmark, isPending: isBookmarkLoading } = useMutation({
      mutationFn: (params: any) => action(params),
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries([Tags.RECIPES, id]);
      },
      onMutate: () => {
         // Очистка кэша
         queryClient.clear();
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
               disabled={isLikeLoading}>
               <img src={isLocalLike ? likeIcon : unlikeIcon} alt='icon like' />
               <span>{localLikes} likes</span>
            </button>
            <button
               onClick={handleBookmarkClick}
               className={styles.section__btn}
               disabled={isBookmarkLoading}>
               <img src={isLocalBookmark ? saveIcon : unsaveIcon} alt='icon save' />
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
