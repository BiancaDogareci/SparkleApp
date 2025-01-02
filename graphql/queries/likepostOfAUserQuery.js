import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import likepostType from '../types/likepostType.js';

const likepostQueryResolver = async (_, { userId }) =>{
    const userExists = await db.User.findOne({
        where: {
            id: userId
        },
    });

    if (!userExists) {
        console.log("Nu exista userul cu acest id");
        return null;
    }

    const likepostsOfUser = await db.LikePost.findAll({
        where: {
            userId
        },
    });

    return likepostsOfUser;
}

const likesOfAUserQuery = {
    type: new GraphQLList(likepostType),
    args: {
        userId: { type: GraphQLInt },
    },
    resolve: likepostQueryResolver,
};

export default likesOfAUserQuery;
