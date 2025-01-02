import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import likepostType from '../types/likepostType.js';

const likepostQueryResolver = async (_, { postId }) =>{
    const postExists = await db.Post.findOne({
        where: {
            id: postId
        },
    });

    if (!postExists) {
        console.log("Nu exista postarea cu acest id");
        return null;
    }

    const likepostsOfPost = await db.LikePost.findAll({
        where: {
            postId
        },
    });

    return likepostsOfPost;
}

const likesOfAPostQuery = {
    type: new GraphQLList(likepostType),
    args: {
        postId: { type: GraphQLInt },
    },
    resolve: likepostQueryResolver,
};

export default likesOfAPostQuery;
