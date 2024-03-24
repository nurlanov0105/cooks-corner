import { FC, useRef, useState } from 'react';
import { useAppSelector } from '@/app/appStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '..';
import { resizeTextarea } from '@/shared/lib/helpers';

import styles from './styles.module.scss';
import { ICommentForm } from '@/shared/lib/types';

interface Props {
   objectId: number;
   setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyForm: FC<Props> = ({ objectId, setShowForm }) => {
   const [commentValue, setCommentValue] = useState('');
   const profileImg = useAppSelector((state) => state.user.profileImg);
   const textareaRef = useRef(null);
   const queryClient = useQueryClient();

   const addCommentMutation = useMutation({
      mutationFn: (newComment: ICommentForm) => {
         return addComment(newComment);
      },
      onSuccess: () => {
         setCommentValue('');
         setShowForm(false);

         // @ts-ignore
         queryClient.invalidateQueries(Tags.COMMENTS, objectId);
      },
   });

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      const newComment = { objectId, text: commentValue, isReply: true };
      e.preventDefault();
      addCommentMutation.mutate(newComment);
   };

   const onKeyDownTextarea = () => {
      resizeTextarea(textareaRef.current);
   };
   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentValue(e.target.value);
   };

   const onClickCancel = () => {
      setCommentValue('');
      setShowForm(false);
   };

   return (
      <form className={styles.form} onSubmit={onSubmit}>
         <div
            className={styles.form__img}
            style={{ backgroundImage: `url(${profileImg && profileImg})` }}></div>
         <div className={styles.form__col}>
            <textarea
               ref={textareaRef}
               className={styles.form__textarea}
               onChange={onChange}
               onKeyDown={onKeyDownTextarea}></textarea>
            <div className={styles.form__btns}>
               <button className={styles.form__cancelBtn} onClick={onClickCancel}>
                  Cancel
               </button>
               <button type='submit' className='btn'>
                  <span>Reply</span>
               </button>
            </div>
         </div>
      </form>
   );
};

export default ReplyForm;
