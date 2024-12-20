import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

// Define the GraphQL User type
const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userId: { type: GraphQLInt },  // userId is the primary key
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    password: { type: GraphQLString } 
  }
});

export default userType;

