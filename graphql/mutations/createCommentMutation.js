import { GraphQLInt } from 'graphql';
import commentInputType from '../types/commentInputType.js';
import commentType from '../types/commentType.js';
import db from '../../models/index.js';

const createCommentMutationResolver = async (_, { comment }, context) => {
  const isAuthorized = !!context.user_id;

  if (!isAuthorized) {
    return false;
  }

  try {
    if (comment.parentCommentId) {
      const parentComment = await db.Comment.findByPk(comment.parentCommentId);

      if (!parentComment) {
        console.log("Nu exista comentariu cu acel id introdus ca parentCommentId.");
        return null;
      }

      if (parentComment.parentCommentId !== null) {
        console.log("Comentarii la comentarii la comentarii nu sunt permise (adancime maxima = 2, comentarii la postari sau comentarii la comentarii).");
        return null;
      }

      if (parentComment.postId !== comment.postId) {
        console.log("Comentariul parinte si comentariul copil trebuie sa apartina aceleiasi postari.");
        return null;
      }
    }

    const newComment = await db.Comment.create({
      body: comment.body,   
      userId: context.user_id, 
      postId: comment.postId, 
      parentCommentId: comment.parentCommentId || null,
      edited: false,  
    });

    return newComment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const createCommentMutation = {
  type: commentType,
  args: {
    comment: { type: commentInputType },
  },
  resolve: createCommentMutationResolver,
};

export default createCommentMutation;
