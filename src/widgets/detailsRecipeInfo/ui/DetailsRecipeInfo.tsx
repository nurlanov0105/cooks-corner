import classNames from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

import wathIcon from '@/shared/assets/imgs/detailsRecipe/watches.svg';
import likeIcon from '@/shared/assets/imgs/detailsRecipe/like.svg';
import unlikeIcon from '@/shared/assets/imgs/detailsRecipe/unlike.svg';
import saveIcon from '@/shared/assets/imgs/detailsRecipe/save.svg';
import unsaveIcon from '@/shared/assets/imgs/detailsRecipe/unsave.svg';
import { FC } from 'react';

interface Props {
   isLiked: boolean;
   isSaved: boolean;
}

const DetailsRecipeInfo: FC<Props> = ({ isLiked, isSaved }) => {
   return (
      <section className={styles.section}>
         <div className={styles.section__top}>
            <h2 className={classNames('h2', styles.section__title)}>Ainsley’s Jerk Chicken</h2>
            <Link to={`/authors/:id`} className={styles.section__author}>
               by Ainsley Harriott
            </Link>
         </div>
         <div className={styles.section__management}>
            <div className={styles.section__time}>
               <img src={wathIcon} alt='watch icon' />
               <span>20-30 min</span>
            </div>
            <span className={styles.section__level}>Easy</span>
         </div>
         <div className={styles.section__actions}>
            <button className={styles.section__btn}>
               <img src={isLiked ? likeIcon : unlikeIcon} alt='icon like' />
               <span>12 likes</span>
            </button>
            <button className={styles.section__btn}>
               <img src={isSaved ? saveIcon : unsaveIcon} alt='icon save' />
            </button>
         </div>
         <div className={styles.section__description}>
            <h3 className={styles.section__subtitle}>Description</h3>
            <p>
               You pick up your palette knife and then work that into. Give your meat a good old
               rub. That’s it, nice and hot, hot and spicy meat. He-he boy...You pick up your
               palette knife and then work that into. Give your meat a good old rub. That’s it, nice
               and hot, hot and spicy meat. He-he boy...You pick up your palette knife and then work
               that into. Give your meat a good old rub. That’s it, nice and hot, hot and spicy
               meat. He-he boy...
            </p>
         </div>
         <div className={styles.section__ingredients}>
            <h3 className={styles.section__subtitle}>Ingredients</h3>
            <ul className={styles.section__list}>
               <li className={styles.section__item}>
                  <h5>Chicken</h5>
                  <span>1 kg</span>
               </li>
               <li className={styles.section__item}>
                  <h5>Olive oil</h5>
                  <span>3/4 spoon</span>
               </li>
               <li className={styles.section__item}>
                  <h5>Garlic powder</h5>
                  <span>1/2 spoon</span>
               </li>
            </ul>
         </div>
      </section>
   );
};

export default DetailsRecipeInfo;
