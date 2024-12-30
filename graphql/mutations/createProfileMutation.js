import profileInputType from '../types/profileInputType.js';
import profileType from '../types/profileType.js';
import db from '../../models/index.js';

const createProfileMutationResolver = async (_, { profile }, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
      return false;
    }
    
    try {
        const existingProfile = await db.Profile.findOne({ where: { userId: context.user_id } });
        if (existingProfile) {
            throw new Error("Acest user deja are un profil.");
        }

        const createdProfile = await db.Profile.create({
            userId: context.user_id,
            profilePhoto: profile.profilePhoto,
            bio: profile.bio,
            website: profile.website,
            publicEmail: profile.publicEmail,
            language: profile.language,
            themePreference: profile.themePreference
        });

        return createdProfile;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createProfileMutation = {
    type: profileType,
    args: {
        profile: {type: profileInputType},
    },
    resolve: createProfileMutationResolver
};

export default createProfileMutation;
