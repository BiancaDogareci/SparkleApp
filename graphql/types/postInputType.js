import { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';

const postInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    title: { type: GraphQLString },         // Title of the post
    content: { type: GraphQLString },       // Content of the post
    edited: { type: GraphQLBoolean },       // Whether the post is edited
    labels: { type: new GraphQLList(GraphQLString) }  // List of labels for the post
  },
});

export default postInputType;
