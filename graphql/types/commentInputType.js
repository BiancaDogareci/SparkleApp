import { GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql';


export const commentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    body: { type: GraphQLString },
    postId: { type: GraphQLInt },
    edited: { type: GraphQLBoolean }
  })
});
export default commentInputType;