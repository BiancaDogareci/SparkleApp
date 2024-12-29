import { GraphQLList } from 'graphql';
import postType from '../types/postType.js';
import db from '../../models/index.js';

const postsQueryResolver = async () => {
    const posts = await db.Post.findAll();

    return posts;
}

const postsQuery = {
    type: new GraphQLList(postType),
    resolve: postsQueryResolver,
};

export default postsQuery;
