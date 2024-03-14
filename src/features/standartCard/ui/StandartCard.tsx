import { FC } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import likeIcon from '@/shared/assets/imgs/search/like.svg';
import unlikeIcon from '@/shared/assets/imgs/search/unlike.svg';
import savedIcon from '@/shared/assets/imgs/search/saved.svg';
import unsavedIcon from '@/shared/assets/imgs/search/unsaved.svg';

interface Props {
   image: string;
   isLiked: boolean;
   isSaved: boolean;
}

const StandartCard: FC<Props> = ({ isLiked, isSaved, image }) => {
   return (
      <div className={styles.card}>
         <Link
            to={`/details-recipe/:id`}
            className={styles.card__img}
            style={{ backgroundImage: `url(${image})` }}></Link>
         <h4 className={styles.card__title}>Egg Omlet</h4>
         <Link to={`/authors/:id`} className={styles.card__author}>
            by Ainsley Harriott
         </Link>
         <div className={styles.card__row}>
            <div className={styles.card__actions}>
               <img src={isLiked ? likeIcon : unlikeIcon} alt='like icon' />
               <span>118</span>
            </div>
            <div className={styles.card__actions}>
               <img src={isSaved ? savedIcon : unsavedIcon} alt='save icon' />
               <span>118</span>
            </div>
         </div>
      </div>
   );
};

export default StandartCard;
