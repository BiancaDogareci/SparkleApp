import { GraphQLInt } from 'graphql';
import profileInputType from '../types/profileInputType.js';
import profileType from '../types/profileType.js';
import db from '../../models/index.js';

const updateProfileMutationResolver = async(_, args, context) =>{
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
      return false;
    }

    const id = args.id;

    const profile = await db.Profile.findOne({
        where: {
            id
        }
    });

    if (!profile){
        console.log("Nu exista profilul cu acest id.");
        return false;
    }

    if (context.user_id === profile.userId) {
        const updatedProfile = await profile.update({
            ...args.profile
        });
    
        return updatedProfile;
    } else {
        console.log("Nu poti edita profilul altui user.")
        return false;
    }
}

const updateProfileMutation = {
    type: profileType,
    args: {
        id: {type: GraphQLInt},
        profile: {type: profileInputType}
    },
    resolve: updateProfileMutationResolver,
};

export default updateProfileMutation;
