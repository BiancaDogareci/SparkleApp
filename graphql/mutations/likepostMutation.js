import { GraphQLInt } from 'graphql';
import likePostType from '../types/likepostType.js';
import db from '../../models/index.js';

const likePostMutationResolver = async (_, { postId }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        return null;
    }

    const userId = context.user_id;

    const existingLike = await db.LikePost.findOne({
        where: {
        userId,
        postId,
        },
    });

    if (existingLike) {
        console.log('Ai apreciat deja postarea.');
        return null;
    }

    const newLike = await db.LikePost.create({
        userId,
        postId,
        givenAt: new Date()
    });

    return newLike;
};

const likePostMutation = {
    type: likePostType,
    args: {
        postId: { type: GraphQLInt }
    },
    resolve: likePostMutationResolver,
};

export default likePostMutation;
