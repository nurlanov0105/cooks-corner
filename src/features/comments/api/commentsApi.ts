import { baseApiInstance } from '@/shared/api/instance';
import { Comments } from '@/shared/api';

export const getComments = async (params: any) => {
   const response = await baseApiInstance.get(
      `${Comments.COMMENTS}/${params.objectId}?size=${params.size}&page=${params.page}`
   );

   return response.data;
};
export const getNestedComments = async (params: any) => {
   const response = await baseApiInstance.get(
      `${Comments.COMMENTS}/${params.parentId}/replies?parentId=${params.parentId}`
   );

   return response.data;
};

export const addComment = async (newComment: any) => {
   const response = await baseApiInstance.post(Comments.COMMENTS, newComment);

   return response.data;
};
export const updateComment = async (updatedData: any) => {
   const response = await baseApiInstance.put(Comments.COMMENTS, updatedData);

   return response.data;
};
export const deleteComment = async (commentId: number | string) => {
   const response = await baseApiInstance.delete(Comments.COMMENTS + '/' + commentId);

   return response.data;
};
