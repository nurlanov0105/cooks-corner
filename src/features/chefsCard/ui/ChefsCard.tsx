import { FC } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

interface Props {
   image: string;
}

const ChefsCard: FC<Props> = ({ image }) => {
   return (
      <Link to={'/authors/:id'} className={styles.card}>
         <div className={styles.card__img} style={{ backgroundImage: `url(${image})` }}></div>
         <h4 className={styles.card__title}>Gan Fang</h4>
      </Link>
   );
};

export default ChefsCard;
