import { FC } from 'react';
import { RecipeCard } from '@/features/recipeCard';
import { RecipeCardSkeleton } from '@/shared/ui';

import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
   cards: any;
   isLoading: boolean;
   isCenter?: boolean;
   isProfile?: boolean;
}

const CardsSection: FC<Props> = ({ cards, isLoading, isCenter = false, isProfile = false }) => {
   return (
      <section className={classNames(styles.section, isCenter ? styles.section_center : '')}>
         {cards.map((card: any, i: number) =>
            isLoading && !isProfile ? (
               <RecipeCardSkeleton key={i} />
            ) : (
               <RecipeCard key={isLoading ? i : card.recipeId} {...card} />
            )
         )}
      </section>
   );
};

export default CardsSection;
