import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { formatDistanceStrict } from 'date-fns';
import classNames from 'classnames';
import { useAuth } from '@/shared/lib/hooks';
import { useAppDispatch } from '@/app/appStore';
import { FC, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showModal } from '@/widgets/modal';
import { handleActionClick } from '@/shared/lib/helpers';
import { action } from '@/entities/recipes';
import { toast } from 'react-toastify';
import { Tags } from '@/shared/api';
import { CommentReply, deleteComment, updateComment } from '..';
import ReplyForm from '../replyForm/ReplyForm';
import { getUserInfoFomLS } from '@/shared/lib/helpers/getUserInfoFomLS';

interface Props {
   commentId: number;
   parentCommentId: number;
   authorId: number;
   imageUrl: string;
   author: string;
   createdAt: string;
   updatedAt: string;
   isUpdated: true;
   replyCount: number;
   likeCount: number;
   isLiked: true;
   text: string;
   isNested: boolean;
   isDeleted: boolean;
}

const Comment: FC<Props> = ({
   commentId,
   parentCommentId,
   authorId,
   imageUrl,
   author,
   createdAt,
   // updatedAt,
   isUpdated,
   replyCount,
   likeCount,
   isLiked,
   text,
   isDeleted,
   isNested,
}) => {
   const { isAuth } = useAuth();
   const dispatch = useAppDispatch();
   const queryClient = useQueryClient();
   const { userId } = getUserInfoFomLS();

   const [isLocalLike, setIsLocalLike] = useState(isLiked);
   const [localLikes, setLocalLikes] = useState(likeCount);
   const [showForm, setShowForm] = useState(false);
   const [showEdit, setShowEdit] = useState(false);

   const [isEditing, setIsEditing] = useState(false);
   const [editedText, setEditedText] = useState(text);

   const listRef = useRef(null);

   const likeMutation = useMutation({
      mutationFn: action,
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries([Tags.RECIPES]);
      },
      onError: (error) => {
         toast.error('like error');
         console.log(error);
      },
   });

   const deleteCommentMutation = useMutation({
      mutationFn: (commentId: number) => {
         return deleteComment(commentId);
      },
      onSuccess: () => {
         // @ts-ignore
         queryClient.invalidateQueries(Tags.COMMENTS);
      },
      onMutate: () => {
         // Очистка кэша
         queryClient.clear();
      },
   });
   const updateCommentMutation = useMutation({
      mutationFn: (updatedData: any) => {
         return updateComment(updatedData);
      },
      onSuccess: (data) => {
         // @ts-ignore
         queryClient.invalidateQueries(Tags.COMMENTS);
         console.log(data);
      },
      onMutate: () => {
         // Очистка кэша
         queryClient.clear();
      },
   });

   const handleLikeClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      if (likeMutation.isPending) {
         return;
      }

      handleActionClick({
         isLocalAction: isLocalLike,
         // @ts-ignore
         setLocalAction: setIsLocalLike,
         localCount: localLikes,
         setLocalCount: setLocalLikes,
         actionId: 10,
         newActionId: 1,
         recipeId: commentId,
         actionMutate: likeMutation.mutate,
         objectTypeId: 1,
      });
   };

   const onReplyClick = () => {
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }

      setShowForm(!showForm);
   };

   const onEditBtnClick = (e: any) => {
      e.stopPropagation();
      if (!isAuth) {
         dispatch(showModal('NotAuthNotice'));
         return;
      }
      setShowEdit(!showEdit);
   };
   const onEditItemClick = () => {
      setIsEditing(true);
      setShowEdit(false);
   };

   const onSaveEditClick = () => {
      const updatedData = { commentId, text: editedText };
      setIsEditing(false);
      updateCommentMutation.mutate(updatedData);
   };
   const onCancelBtnClick = () => {
      setIsEditing(false);
   };

   const onDeleteBtnClick = () => {
      setShowEdit(!showEdit);
      deleteCommentMutation.mutate(commentId);
   };

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (listRef.current && !e.composedPath().includes(listRef.current)) {
            setShowEdit(false);
         }
      };
      document.body.addEventListener('click', handleClickOutside);

      // Убрать прослушку при DIDUnmount
      return () => document.body.removeEventListener('click', handleClickOutside);
   }, []);

   return (
      <div key={commentId} className={styles.user}>
         {isDeleted || author === 'Deleted User' ? (
            <div className={styles.user__img}></div>
         ) : (
            <Link
               to={`/authors/${authorId}`}
               className={styles.user__img}
               style={{ backgroundImage: `url(${imageUrl})` }}></Link>
         )}

         <div className={styles.user__block}>
            <div className={styles.user__col}>
               <div className={styles.user__top}>
                  {isDeleted || author === 'Deleted User' ? (
                     <div className={styles.user__name}>{author}</div>
                  ) : (
                     <Link to={`/authors/${authorId}`} className={styles.user__name}>
                        {author}
                     </Link>
                  )}

                  <span className={styles.user__span}>
                     {formatDistanceStrict(createdAt, new Date(), {
                        addSuffix: true,
                     })}
                  </span>
                  {isUpdated && <span className={styles.user__span}>(edited)</span>}
               </div>
               {isEditing ? (
                  <div>
                     <textarea
                        className={styles.user__textarea}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                     />
                     <div className={styles.user__btns}>
                        <button className={styles.user__btn} onClick={onCancelBtnClick}>
                           Cancel
                        </button>
                        <button className='btn' onClick={onSaveEditClick}>
                           <span>Save</span>
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className={styles.user__text}>{text}</div>
               )}
            </div>
            <div className={styles.user__actions}>
               <div className={styles.user__likes}>
                  <button
                     type='button'
                     onClick={handleLikeClick}
                     disabled={
                        likeMutation.isPending || updateCommentMutation.isPending || isDeleted
                     }
                     className={styles.user__row}>
                     <div
                        className={classNames(
                           isLocalLike ? styles.user__like_active : styles.user__like
                        )}>
                        <svg
                           width='800px'
                           height='800px'
                           viewBox='0 0 24 24'
                           xmlns='http://www.w3.org/2000/svg'>
                           <path
                              d='M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                           />
                        </svg>
                     </div>

                     <div className={styles.user__count}>{localLikes}</div>
                  </button>
               </div>
               <button
                  disabled={isDeleted}
                  type='button'
                  className={styles.user__replyBtn}
                  onClick={onReplyClick}>
                  Reply
               </button>
            </div>
            {showForm && (
               <ReplyForm
                  objectId={isNested ? parentCommentId : commentId}
                  setShowForm={setShowForm}
               />
            )}

            {!isNested && replyCount > 0 && (
               <CommentReply
                  key={commentId}
                  parentId={commentId}
                  replyCount={replyCount}
                  isDeleted={isDeleted}
               />
            )}
         </div>
         {authorId === userId && isAuth ? (
            <div className={styles.user__edit}>
               <button
                  disabled={deleteCommentMutation.isPending || isDeleted}
                  className={styles.user__editBtn}
                  onClick={onEditBtnClick}>
                  <span></span>
                  <span></span>
                  <span></span>
               </button>
               {showEdit && (
                  <ul ref={listRef} className={styles.user__list}>
                     <li className={styles.user__item} onClick={onEditItemClick}>
                        Edit
                     </li>
                     <li className={styles.user__item} onClick={onDeleteBtnClick}>
                        Delete
                     </li>
                  </ul>
               )}
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default Comment;
