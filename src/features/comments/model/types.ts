export interface IComments {
   objectId: number;
   size: number;
   page: number;
}

export interface INewComment {
   objectId: number;
   text: string;
   isReply: boolean;
}
export interface IUpdateComment {
   commentId: number;
   text: string;
}

export interface IComment {
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
