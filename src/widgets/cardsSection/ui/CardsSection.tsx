import { FC } from 'react';
import { RecipeCard } from '@/features/recipeCard';
import { RecipeCardSkeleton } from '@/shared/ui';

import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
   cards: any;
   isLoading: boolean;
   isCenter?: boolean;
}

const CardsSection: FC<Props> = ({ cards, isLoading, isCenter = false }) => {
   return (
      <section className={classNames(styles.section, isCenter ? styles.section_center : '')}>
         {cards.map((card: any, i: number) =>
            isLoading ? (
               <RecipeCardSkeleton key={i} />
            ) : (
               <RecipeCard key={card.recipeId} {...card} />
            )
         )}
      </section>
   );
};

export default CardsSection;
