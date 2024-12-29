import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username:{type: GraphQLString},
        email:{type: GraphQLString}
    }
});

export default userType;
