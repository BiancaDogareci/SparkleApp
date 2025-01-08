import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import likecommentType from '../types/likecommentType.js';

const likecommentQueryResolver = async (_, { commentId }) =>{
    const commentExists = await db.Comment.findOne({
        where: {
            id: commentId
        },
    });

    if (!commentExists) {
        console.log("Nu exista comentariul cu acest id");
        return null;
    }

    const likecommentOfComment = await db.LikeComment.findAll({
        where: {
            commentId
        },
    });

    return likecommentOfComment;
}

const likecommentOfACommentQuery = {
    type: new GraphQLList(likecommentType),
    args: {
        commentId: { type: GraphQLInt },
    },
    resolve: likecommentQueryResolver,
};

export default likecommentOfACommentQuery;
