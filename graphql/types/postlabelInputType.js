import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

const postlabelInputType = new GraphQLInputObjectType({
    name: 'PostLabelInput',
    fields: {
        postId: {type: GraphQLInt},
        labelId: {type: GraphQLInt} 
    }
});

export default postlabelInputType;
