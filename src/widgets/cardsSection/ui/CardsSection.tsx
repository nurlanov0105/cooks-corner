import { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { RecipeCard } from '@/features/recipeCard';
import { RecipeCardSkeleton } from '@/shared/ui';

interface Props {
   cards: any;
   isLoading: boolean;
   isCenter?: boolean;
}

const CardsSection: FC<Props> = ({ cards, isLoading, isCenter = false }) => {
   return (
      <section className={classNames(styles.section, isCenter ? styles.section_center : '')}>
         {cards.map((card: any, i: number) =>
            isLoading ? <RecipeCardSkeleton key={i} /> : <RecipeCard key={i} {...card} />
         )}
      </section>
   );
};

export default CardsSection;
