import { BackArrow } from '@/entities/backArrow';
import styles from './styles.module.scss';
import { AuthorInfo } from '@/widgets/authorInfo';
import { CardsSection } from '@/widgets/cardsSection';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '@/entities/profile';

const Author = () => {
   const { id } = useParams();

   const { data, isLoading, isError } = useGetUserQuery({ userId: id });

   return (
      <div className='container'>
         <BackArrow />
         <AuthorInfo {...data} isLoading={isLoading} isError={isError} />
         <div className={styles.row}>
            <CardsSection cards={[...Array(24)]} isLoading={true} isCenter={true} />
         </div>
      </div>
   );
};

export default Author;
