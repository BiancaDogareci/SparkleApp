import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import userType from './userType.js';
import postType from './postType.js';

const likepostType = new GraphQLObjectType({
    name: 'LikePost',
    fields: {
        userId: { type: GraphQLInt },
        user: {
            type: userType, 
            resolve(parentValue) {
              return parentValue.getUser(); 
            }
        },
        postId: { type: GraphQLInt },
        post: {
            type: postType, 
            resolve(parentValue) {
              return parentValue.getPost(); 
            }
        },
        givenAt: { type: GraphQLString }
    }
});

export default likepostType;
