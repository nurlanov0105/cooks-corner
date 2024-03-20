import { FC } from 'react';
import { BackArrow } from '@/entities/backArrow';
import styles from './styles.module.scss';

interface Props {
   imageUrl: string;
}

const DetailsBackground: FC<Props> = ({ imageUrl }) => {
   return (
      <section className={styles.section} style={{ backgroundImage: `url(${imageUrl})` }}>
         <BackArrow />
      </section>
   );
};

export default DetailsBackground;
