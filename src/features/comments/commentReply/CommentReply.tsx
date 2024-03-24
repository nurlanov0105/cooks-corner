import { FC, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { Tags } from '@/shared/api';
import { Comment, getNestedComments } from '..';

interface Props {
   parentId: number;
   replyCount: number;
   isDeleted: boolean;
}

const CommentReply: FC<Props> = ({ parentId, replyCount, isDeleted }) => {
   const [show, setShow] = useState(false);
   const onIconClick = () => {
      setShow(!show);
   };

   const { data, isLoading, isSuccess } = useQuery({
      queryKey: [Tags.COMMENTS, parentId],
      queryFn: () => getNestedComments(parentId),
   });

   return (
      <div className={styles.replyWrapper}>
         <div className={styles.reply} onClick={onIconClick}>
            <button>
               <svg
                  viewBox='0 0 24 24'
                  fill='black'
                  className={classNames(styles.reply__icon, show ? styles.reply__icon_active : '')}>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 16l-6-6h12z' />
               </svg>
            </button>

            <div className={styles.reply__inner}>
               <div
                  className={styles.reply__img}
                  style={{
                     backgroundImage: `url(${isLoading ? '' : data.content[0].imageUrl})`,
                  }}></div>
               <button
                  type='button'
                  className={classNames(styles.reply__btn, isDeleted ? styles.reply__btn_not : '')}>
                  <span>{replyCount}</span> <span>replies</span>
               </button>
            </div>
         </div>
         <div className={styles.comments}>
            {show &&
               isSuccess &&
               data.content.map((comment: any) => (
                  <Comment key={comment.commentId} {...comment} replyCount={[]} isNested={true} />
               ))}
         </div>
      </div>
   );
};

export default CommentReply;
