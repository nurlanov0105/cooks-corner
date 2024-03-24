import { baseApiInstance } from '@/shared/api/instance';
import { Comments } from '@/shared/api';
import { IComments, INewComment, IUpdateComment } from '../model/types';

export const getComments = async (params: IComments) => {
   const response = await baseApiInstance.get(
      `${Comments.COMMENTS}/${params.objectId}?size=${params.size}&page=${params.page}`
   );

   return response.data;
};
export const getNestedComments = async (parentId: number) => {
   const response = await baseApiInstance.get(`${Comments.COMMENTS}/${parentId}/replies`);

   return response.data;
};

export const addComment = async (newComment: INewComment) => {
   const response = await baseApiInstance.post(Comments.COMMENTS, newComment);
   return response.data;
};
export const updateComment = async (updatedData: IUpdateComment) => {
   const response = await baseApiInstance.put(Comments.COMMENTS, updatedData);

   return response.data;
};
export const deleteComment = async (commentId: number) => {
   const response = await baseApiInstance.delete(Comments.COMMENTS + '/' + commentId);

   return response.data;
};
