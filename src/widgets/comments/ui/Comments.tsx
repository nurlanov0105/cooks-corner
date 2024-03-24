import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import {
   Comment,
   CommentPagination,
   addComment,
   getComments,
   setCurrentPage,
   setTotalPages,
} from '@/features/comments';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks';
import { ICommentForm } from '@/shared/lib/types';
import { showModal } from '@/widgets/modal';
import { IComment } from '@/features/comments/model/types';

interface Props {
   recipeId: number;
}

const Comments: FC<Props> = ({ recipeId }) => {
   const { isAuth } = useAuth();
   const queryClient = useQueryClient();
   const dispatch = useAppDispatch();

   const { limit, totalPages, currentPage } = useAppSelector((state) => state.comments);
   const [commentValue, setCommentValue] = useState('');

   const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: [Tags.COMMENTS, recipeId, limit, totalPages, currentPage],
      queryFn: () => getComments({ objectId: Number(recipeId), size: limit, page: currentPage }),
   });

   const addCommentMutation = useMutation({
      mutationFn: (newComment: ICommentForm) => {
         return addComment(newComment);
      },
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries(Tags.COMMENTS);
         setCommentValue('');
      },
   });

   const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentValue(e.target.value);
   };

   const onCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }
      const newComment = { objectId: Number(recipeId), text: commentValue, isReply: false };
      addCommentMutation.mutate(newComment);
   };

   useEffect(() => {
      if (isSuccess) {
         dispatch(setTotalPages(data.totalPages));
      }
   }, [isSuccess]);

   const onChangePage = (num: number) => {
      dispatch(setCurrentPage(num));
   };

   return (
      <div className={styles.comments}>
         <h2 className='h2'>Comments</h2>
         <form className={styles.comments__form} onSubmit={onCommentSubmit}>
            <textarea
               className={styles.comments__textarea}
               value={commentValue}
               onChange={onCommentChange}
               placeholder='Leave comment'></textarea>
            <div className={styles.comments__row}>
               {isAuth ? (
                  <h3>Leave comment</h3>
               ) : (
                  <div className={styles.comments__auth}>
                     <Link to='/signin' className='accent-color'>
                        Sign in
                     </Link>
                     or
                     <Link to='/signup' className='accent-color'>
                        Sign up
                     </Link>
                  </div>
               )}

               <button
                  disabled={!commentValue || addCommentMutation.isPending}
                  className={classNames('btn', styles.comments__btn)}>
                  {addCommentMutation.isPending ? <span>Sending...</span> : <span>Send</span>}
               </button>
            </div>
         </form>
         <div className={styles.comments__container}>
            {isError ? <h2>Error</h2> : isLoading && <h2>Loading...</h2>}
            {isSuccess &&
               data?.content?.map((comment: IComment) => (
                  <Comment key={comment.commentId} {...comment} />
               ))}
            <div className={styles.comments__pagination}>
               <CommentPagination
                  currentPage={currentPage}
                  onChangePages={(num: number) => onChangePage(num)}
                  totalPages={totalPages}
               />
            </div>
         </div>
      </div>
   );
};

export default Comments;
