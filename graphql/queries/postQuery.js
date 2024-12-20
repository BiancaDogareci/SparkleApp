import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import postType from '../types/postType.js';

const postQueryResolver = async (_, { id }) => {
    const post = await db.Post.findOne({
      where: { postId: id },
      include: [{
        model: db.User,
        as: 'author', // Ensure 'author' matches the alias used in your query
      }],
    });
  
    if (!post) {
      throw new Error("Post not found");
    }
  
    return post; // Return the found post with author data included
  };
  


const postQuery = {
    type: postType,
    args: {
        id: { type: GraphQLInt },  // Query argument is the post's ID
    },
    resolve: postQueryResolver,
};

export default postQuery;
