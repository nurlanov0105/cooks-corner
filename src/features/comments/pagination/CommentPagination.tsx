import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './styles.module.scss';

type PaginationProps = {
   currentPage: number;
   totalPages: number;
   onChangePages: (page: number) => void;
};

const CommentPagination: React.FC<PaginationProps> = ({
   currentPage,
   onChangePages,
   totalPages,
}) => {
   return (
      <ReactPaginate
         className={styles.root}
         breakLabel='...'
         nextLabel='>'
         onPageChange={(e) => onChangePages(e.selected)}
         pageRangeDisplayed={2}
         pageCount={Math.ceil(totalPages)}
         forcePage={currentPage}
         previousLabel='<'
         renderOnZeroPageCount={null}
      />
   );
};

export default CommentPagination;
