import { GraphQLObjectType, GraphQLInt } from 'graphql';

const postlabelType = new GraphQLObjectType({
    name: 'PostLabel',
    fields: {
        postId: {type: GraphQLInt},
        labelId: {type: GraphQLInt}
    }
});

export default postlabelType;
