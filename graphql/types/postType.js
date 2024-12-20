import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import userType from './userType.js';
import labelType from './labelType.js';  // Assuming you have a labelType defined elsewhere

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    postId: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    edited: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: userType,  // Ensure userType is correctly defined
      resolve: (post) => {
        return post.author;  // Sequelize will automatically resolve the author field
      },
    },
    labels: {
      type: new GraphQLList(labelType),
      resolve: (post) => {
        return post.labels;  // Sequelize will fetch associated labels
      },
    },
  },
});

export default postType;
