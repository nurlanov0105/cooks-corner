import { BackArrow } from '@/entities/backArrow';
import styles from './styles.module.scss';
import { AuthorInfo } from '@/widgets/authorInfo';
import { CardsSection } from '@/widgets/cardsSection';

const Author = () => {
   return (
      <div className='container'>
         <BackArrow />
         <AuthorInfo authorImg='' />
         <div className={styles.row}>
            <CardsSection cards={[...Array(24)]} isCenter={true} />
         </div>
      </div>
   );
};

export default Author;
