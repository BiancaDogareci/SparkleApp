import { GraphQLInputObjectType, GraphQLString, GraphQLList } from 'graphql';

const postInputType = new GraphQLInputObjectType({
    name: 'PostInput',
    fields: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        labels: { type: new GraphQLList(GraphQLString)}
    }
});

export default postInputType;
