import {
   getComments,
   addComment,
   getNestedComments,
   deleteComment,
   updateComment,
} from './api/commentsApi';
import commentSlice, { setComments, setSize, setPage } from './model/commentSlice';
import Comment from './comment/Comment';
import CommentReply from './commentReply/CommentReply';
export {
   commentSlice,
   setComments,
   setSize,
   setPage,
   Comment,
   CommentReply,
   getComments,
   addComment,
   getNestedComments,
   deleteComment,
   updateComment,
};
