import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'

const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        username: { type: GraphQLString },
        email:{ type: GraphQLString }
    }
});

export default userInputType;