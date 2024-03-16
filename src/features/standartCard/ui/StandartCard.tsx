import { FC } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import likeIcon from '@/shared/assets/imgs/search/like.svg';
import unlikeIcon from '@/shared/assets/imgs/search/unlike.svg';
import savedIcon from '@/shared/assets/imgs/search/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/search/unsaved.svg';
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
   return (
      <div className={styles.card}>
         <Link
            to={`/details-recipe/${recipeId}`}
            className={styles.card__img}
            style={{ backgroundImage: `url(${imageUrl})` }}></Link>
         <h4 className={styles.card__title}>{title}</h4>
         <Link to={`/authors/${recipeId}`} className={styles.card__author}>
            by {author}
         </Link>
         <div className={styles.card__row}>
            <div className={styles.card__actions}>
               <img src={isLiked ? likeIcon : unlikeIcon} alt='like icon' />
               <span>{likes}</span>
            </div>
            <div className={styles.card__actions}>
               <img src={{ isBookmarked } ? savedIcon : unsavedIcon} alt='save icon' />
               <span>{bookmarks}</span>
            </div>
         </div>
      </div>
   );
};

export default StandartCard;
