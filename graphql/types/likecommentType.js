import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import userType from './userType.js';
import commentType from './commentType.js';

const likecommentType = new GraphQLObjectType({
    name: 'LikeComment',
    fields: {
        userId: { type: GraphQLInt },
        user: {
            type: userType, 
            resolve(parentValue) {
              return parentValue.getUser(); 
            }
        },
        commentId: { type: GraphQLInt },
        comment: {
            type: commentType, 
            resolve(parentValue) {
              return parentValue.getComment(); 
            }
        },
        givenAt: { type: GraphQLString }
    }
});

export default likecommentType;
