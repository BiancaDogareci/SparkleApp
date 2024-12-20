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
    const newComment = await db.Comment.create({
      body: comment.body,   
      userId: context.user_id, 
      postId: comment.postId, 
      edited: comment.edited || false,  
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
