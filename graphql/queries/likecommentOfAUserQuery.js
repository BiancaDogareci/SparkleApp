import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import likecommentType from '../types/likecommentType.js';

const likecommentQueryResolver = async (_, { userId }) =>{
    const userExists = await db.User.findOne({
        where: {
            id: userId
        },
    });

    if (!userExists) {
        console.log("Nu exista userul cu acest id");
        return null;
    }

    const likecommentOfUser = await db.LikeComment.findAll({
        where: {
            userId
        },
    });

    return likecommentOfUser;
}

const likecommentOfAUserQuery = {
    type: new GraphQLList(likecommentType),
    args: {
        userId: { type: GraphQLInt },
    },
    resolve: likecommentQueryResolver,
};

export default likecommentOfAUserQuery;
