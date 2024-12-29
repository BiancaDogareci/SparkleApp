import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const commentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    body: { type: GraphQLString },
    postId: { type: GraphQLInt },
    parentCommentId: { type: GraphQLInt }
  })
});

export default commentInputType;
