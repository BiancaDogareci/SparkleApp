import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import userType from './userType.js';

const profileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt },
        user: {
            type: userType, 
            resolve(parentValue) {
              return parentValue.getUser(); 
            }
        },
        profilePhoto: { type: GraphQLString },
        bio: { type: GraphQLString },
        website: { type: GraphQLString },
        publicEmail: { type: GraphQLString },
        language: { type: GraphQLString },
        themePreference: { type: GraphQLString }
    }
});

export default profileType;
