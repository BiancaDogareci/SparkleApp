import { GraphQLInt, GraphQLBoolean } from 'graphql';
import db from '../../models/index.js';

const unlikePostMutationResolver = async (_, { postId }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        return false;
    }

    const userId = context.user_id;

    const existingLike = await db.LikePost.findOne({
        where: {
            userId,
            postId,
        },
    });

    if (!existingLike) {
        console.log('Acest like nu exista.');
        return false;
    }

    await db.LikePost.destroy({
        where: {
            userId,
            postId,
        },
    });

    return true;
};

const unlikePostMutation = {
    type: GraphQLBoolean,
    args: {
        postId: { type: GraphQLInt },
    },
    resolve: unlikePostMutationResolver,
};

export default unlikePostMutation;
