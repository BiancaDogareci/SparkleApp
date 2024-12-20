import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import userType from './userType.js';
import commentType from './commentType.js';

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        edited: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        author: { 
            type: userType,
            resolve: async (post) => {
                const user = await post.getUser();
                return user;
            }
        },
        labels: {
            type: new GraphQLList(GraphQLString), 
            resolve: async (post) => {
                const labels = await post.getLabels();
                return labels.map(label => label.name); 
            }
        },
        comments: { 
            type: new GraphQLList(commentType), 
            resolve: async (post) => {
                const comments = await post.getComments(); 
                return comments;
            }
        }
    }
});

export default postType;
