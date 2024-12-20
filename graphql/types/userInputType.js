import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'

const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        password: { type: GraphQLString } 
    }
});

export default userInputType;