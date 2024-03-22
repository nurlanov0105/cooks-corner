import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { Comment, addComment, getComments } from '@/features/comments';
import { useAppDispatch, useAppSelector } from '@/app/appStore';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuth } from '@/shared/lib/hooks';
import { ICommentForm } from '@/shared/lib/types';
import { showModal } from '@/widgets/modal';

interface Props {
   recipeId: string;
}

const Comments: FC<Props> = ({ recipeId }) => {
   const { isAuth } = useAuth();
   const queryClient = useQueryClient();
   const dispatch = useAppDispatch();

   const { size, page } = useAppSelector((state) => state.comments);
   const [commentValue, setCommentValue] = useState('');

   const { data, isLoading, isError, isSuccess } = useQuery({
      queryKey: [Tags.COMMENTS, recipeId],
      queryFn: () => getComments({ objectId: recipeId, size, page }),
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
      const newComment = { objectId: recipeId, text: commentValue, isReply: false };
      addCommentMutation.mutate(newComment);
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
                  <span>Send</span>
               </button>
            </div>
         </form>
         <div className={styles.comments__container}>
            {isError ? <h2>Error</h2> : isLoading && <h2>Loading...</h2>}
            {isSuccess &&
               data?.content?.map((comment: any) => (
                  <Comment key={comment.commentId} {...comment} />
               ))}
         </div>
      </div>
   );
};

export default Comments;
