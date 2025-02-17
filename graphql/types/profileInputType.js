import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const profileInputType = new GraphQLInputObjectType({
    name: 'ProfileInput',
    fields: {
        profilePhoto: { type: GraphQLString },
        bio: { type: GraphQLString },
        website: { type: GraphQLString },
        publicEmail: { type: GraphQLString },
        language: { type: GraphQLString },
        themePreference: { type: GraphQLString }
    }
});

export default profileInputType;
