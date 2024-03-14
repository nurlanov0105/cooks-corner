import styles from './styles.module.scss';
import { FC } from 'react';

import likeIcon from '@/shared/assets/imgs/cards/like.svg';
import unlikeIcon from '@/shared/assets/imgs/cards/unlike.svg';
import savedIcon from '@/shared/assets/imgs/cards/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/cards/unsaved.svg';
import { Link } from 'react-router-dom';

interface Props {
   isFavorite: boolean;
   isSaved: boolean;
}

const RecipeCard: FC<Props> = ({ isFavorite, isSaved }) => {
   return (
      <div className={styles.card}>
         <Link to={`/details-recipe/:id`} className={styles.card__fully}></Link>
         <div className={styles.card__block}>
            <Link to={`/details-recipe/:id`} className={styles.card__title}>
               Egg Omlet
            </Link>
            <Link to={`/authors/:id`} className={styles.card__author}>
               by Ainsley Harriott
            </Link>
            <div className={styles.card__row}>
               <div className={styles.card__box}>
                  <img
                     className={styles.card__icon}
                     src={isFavorite ? likeIcon : unlikeIcon}
                     alt='icon'
                  />
                  <span className={styles.card__count}>118</span>
               </div>
               <div className={styles.card__box}>
                  <img
                     className={styles.card__icon}
                     src={isSaved ? savedIcon : unsavedIcon}
                     alt='icon'
                  />
                  <span className={styles.card__count}>118</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RecipeCard;
