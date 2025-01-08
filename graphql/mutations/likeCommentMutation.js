import { GraphQLInt } from 'graphql';
import likecommentType from '../types/likecommentType.js';
import db from '../../models/index.js';

const likeCommentMutationResolver = async (_, { commentId }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        return null;
    }

    const userId = context.user_id;

    const existingLike = await db.LikeComment.findOne({
        where: {
        userId,
        commentId,
        },
    });

    if (existingLike) {
        console.log('Ai apreciat deja comentariul.');
        return null;
    }

    const newLike = await db.LikeComment.create({
        userId,
        commentId,
        givenAt: new Date()
    });

    return newLike;
};

const likeCommentMutation = {
    type: likecommentType,
    args: {
        commentId: { type: GraphQLInt }
    },
    resolve: likeCommentMutationResolver,
};

export default likeCommentMutation;
