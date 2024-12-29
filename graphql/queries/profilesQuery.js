import { GraphQLList } from 'graphql';
import profileType from '../types/profileType.js';
import db from '../../models/index.js';

const profilesQueryResolver = async () => {
    const profiles = await db.Profile.findAll();

    return profiles;
}

const profilesQuery = {
    type: new GraphQLList(profileType),
    resolve: profilesQueryResolver
};

export default profilesQuery;
