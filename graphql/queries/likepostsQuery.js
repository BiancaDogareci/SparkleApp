import { GraphQLList } from 'graphql';
import likepostType from '../types/likepostType.js';
import db from '../../models/index.js';

const likepostsQueryResolver = async () => {
    const allLikesOfPosts = await db.LikePost.findAll();

    return allLikesOfPosts;
}

const allLikesOfPostsQuery = {
    type: new GraphQLList(likepostType),
    resolve: likepostsQueryResolver,
};

export default allLikesOfPostsQuery;
