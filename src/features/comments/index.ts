import {
   getComments,
   addComment,
   getNestedComments,
   deleteComment,
   updateComment,
} from './api/commentsApi';
import commentSlice, {
   setComments,
   setLimit,
   setCurrentPage,
   setTotalPages,
} from './model/commentSlice';
import Comment from './comment/Comment';
import CommentReply from './commentReply/CommentReply';

import CommentPagination from './pagination/CommentPagination';

export {
   commentSlice,
   setComments,
   setLimit,
   setCurrentPage,
   setTotalPages,
   Comment,
   CommentReply,
   getComments,
   addComment,
   getNestedComments,
   deleteComment,
   updateComment,
   CommentPagination,
};
