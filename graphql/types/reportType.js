import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean} from 'graphql';
import userType from './userType.js';
import postType from './postType.js';

const reportType = new GraphQLObjectType({
    name: 'Report',
    fields: {
        id: { type: GraphQLInt },
        reason: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        author: {
            type: userType,
            resolve: async (report) => {
                const user = await report.getUser();
                return user;
            }
        },
        post: {
            type: postType,
            resolve: async (report) => {
                const post = await report.getPost();
                return post;
            }
        }
    }
});

export default reportType;