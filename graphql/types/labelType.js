import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const labelType = new GraphQLObjectType({
    name: 'Label',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        usage: { type: GraphQLInt}
    }
});

export default labelType;