import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql';

const labelInputType = new GraphQLInputObjectType({
    name: "LabelInput",
    fields: {
        name: { type: GraphQLString },
        usage: { type: GraphQLInt }
    }
});

export default labelInputType;