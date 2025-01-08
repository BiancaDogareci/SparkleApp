import { GraphQLList, GraphQLInt } from 'graphql';
import commentType from '../types/commentType.js'; 
import db from '../../models/index.js';


const repliesQueryResolver = async (_, { commentId }) => {
  const replies = await db.Comment.findAll({
    where: {
      parentCommentId: commentId,  
    },
    order: [['createdAt', 'ASC']],  
  });

  return replies;
};

const repliesQuery = {
  type: new GraphQLList(commentType),  
  args: {
    commentId: { type: GraphQLInt },  
  },
  resolve: repliesQueryResolver,  
};

export default repliesQuery;
