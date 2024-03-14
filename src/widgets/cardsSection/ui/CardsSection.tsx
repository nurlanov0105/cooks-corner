import { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { RecipeCard } from '@/features/recipeCard';

interface Props {
   cards: any;
   isCenter?: boolean;
}

const CardsSection: FC<Props> = ({ cards, isCenter = false }) => {
   return (
      <section className={classNames(styles.section, isCenter ? styles.section_center : '')}>
         {cards.map((_: any, i: number) => (
            <RecipeCard key={i} isSaved={false} isFavorite={false} />
         ))}
      </section>
   );
};

export default CardsSection;
