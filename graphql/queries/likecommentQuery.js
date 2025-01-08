import { GraphQLList } from 'graphql';
import likecommentType from '../types/likecommentType.js';
import db from '../../models/index.js';

const likecommentQueryResolver = async () => {
    const allLikesOfComments= await db.LikeComment.findAll();

    return allLikesOfComments;
}

const allLikesOfCommentsQuery = {
    type: new GraphQLList(likecommentType),
    resolve: likecommentQueryResolver,
};

export default allLikesOfCommentsQuery;
