import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import profileType from '../types/profileType.js'; 

const profileQueryResolver = async (_, { id }) => {
    const profile = await db.Profile.findOne({
        where: {
            id
        }
    });

    return profile; 
};

const profileQuery = {
    type: profileType, 
    args: {
        id: { type: GraphQLInt } 
    },
    resolve: profileQueryResolver
};

export default profileQuery;
