import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import commentType from '../types/commentType.js'; 


const commentQueryResolver = async (_, { id }) => {
    const comment = await db.Comment.findOne({
        where: {
            id, 
        }
    });

    return comment; 
};


const commentQuery = {
    type: commentType, 
    args: {
        id: { type: GraphQLInt } 
    },
    resolve: commentQueryResolver,
};

export default commentQuery;
