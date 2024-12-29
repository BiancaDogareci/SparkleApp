import { GraphQLList } from 'graphql';
import commentType from '../types/commentType.js';
import db from '../../models/index.js';

const commentsQueryResolver = async () => {
    const comments = await db.Comment.findAll();

    return comments;
}

const commentsQuery = {
    type: new GraphQLList(commentType),
    resolve: commentsQueryResolver,
};

export default commentsQuery;
