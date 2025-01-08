import { GraphQLInt, GraphQLBoolean } from 'graphql';
import db from '../../models/index.js';

const unlikeCommentMutationResolver = async (_, { commentId }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        return false;
    }

    const userId = context.user_id;

    const existingLike = await db.LikeComment.findOne({
        where: {
            userId,
            commentId,
        },
    });

    if (!existingLike) {
        console.log('Acest like nu exista.');
        return false;
    }

    await db.LikeComment.destroy({
        where: {
            userId,
            commentId,
        },
    });

    return true;
};

const unlikeCommentMutation = {
    type: GraphQLBoolean,
    args: {
        commentId: { type: GraphQLInt },
    },
    resolve: unlikeCommentMutationResolver,
};

export default unlikeCommentMutation;
