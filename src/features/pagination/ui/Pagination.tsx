import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
   totalPages: number;
   currentPage: number;
   handleNextPage: any;
   handlePreviousPage: any;
   handlePageClick: any;
};

const Pagination: FC<Props> = ({
   totalPages,
   currentPage,
   handleNextPage,
   handlePreviousPage,
   handlePageClick,
}) => {
   return (
      <div className={styles.pagination}>
         <button disabled={currentPage === 0} onClick={handlePreviousPage} className={styles.arrow}>
            <span> {'<'}</span>
         </button>

         <div className={styles.list}>
            {[...Array(totalPages)].map((_, i) => {
               return (
                  <button
                     key={i}
                     disabled={i === currentPage}
                     className={styles.pageNumber}
                     onClick={() => handlePageClick(i + 1)}>
                     {i + 1}
                  </button>
               );
            })}
         </div>

         <button
            disabled={currentPage >= totalPages}
            onClick={handleNextPage}
            className={styles.arrow}>
            <span>{'>'}</span>
         </button>
      </div>
   );
};

export default Pagination;
