import { GraphQLInt } from 'graphql';
import commentInputType from '../types/commentInputType.js';
import commentType from '../types/commentType.js';
import db from '../../models/index.js';

const updateCommentMutationResolver = async (_, { id, comment }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        return false;
    }

    const userId = context.user_id;

    const existingComment = await db.Comment.findOne({
        where: {
          id,
        },
    });

    if (!existingComment) {
        return false; 
    }

 
    if (userId === existingComment.userId) {
  
        const updatedComment = await existingComment.update({
            body: comment.body, 
            edited: true,
        });

        return updatedComment; 
    } else {
        return false; 
    }
};

const updateCommentMutation = {
    type: commentType,
    args: {
        id: { type: GraphQLInt }, 
        comment: { type: commentInputType }, 
    },
    resolve: updateCommentMutationResolver,
};

export default updateCommentMutation;
