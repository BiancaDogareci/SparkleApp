import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql';
import userType from './userType.js';
import postType from './postType.js';



export const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLInt },
    body: { type: GraphQLString },
    userId: { type: GraphQLInt },
    postId: { type: GraphQLInt },
    parentCommentId: { type: GraphQLInt },
    edited: { type: GraphQLBoolean },
    user: {
      type: userType, 
      resolve(parentValue) {
        return parentValue.getUser(); 
      }
    },
    post: {
      type: postType, 
      resolve(parentValue) {
        return parentValue.getPost(); 
      }
    },
    parentComment: {
      type: commentType,
      resolve(parentValue) {
        return parentValue.getParentComment();
      }
    },

    likeCount: {
      type: GraphQLInt,
      resolve: async (parentValue) => {
        try {
        
          const likes = await parentValue.getLikeComments();
          return likes.length;
        } catch (error) {
          console.error('Error counting likes:', error);
          return 0;
        }
      }
    }
    
    
  })
});

export default commentType;
