import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

const reportInputType = new GraphQLInputObjectType({
    name: 'ReportInput',
    fields: {
        userId: { type: GraphQLInt },
        postId: { type: GraphQLInt },
        reason: { type: GraphQLString }
    }
});

export default reportInputType;