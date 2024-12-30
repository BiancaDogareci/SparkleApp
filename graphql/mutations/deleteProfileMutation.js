import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteProfileMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const profile = await db.Profile.findOne({
        where: {
            id: args.id,
        }
    });

    if(!profile) {
        console.log("Profilul nu exista.");
        return false;
    }

    if(context.user_id === profile.userId) {
        await profile.destroy();
        return true;
    } else {
        console.log("Poti sa stergi doar profilul care iti apartine, nu pe al altor utilizatori.");
        return false;
    }
}

const deleteProfileMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteProfileMutationResolver,
};

export default deleteProfileMutation;
