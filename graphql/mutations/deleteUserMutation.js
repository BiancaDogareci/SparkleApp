import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteUserResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;  // Check if the user is authorized based on the context
   
    if (!isAuthorized) {
        return false;
    }

    // Find the user based on userId (not id)
    const user = await db.User.findOne({
        where: {
            userId: args.id,  // Use userId as per your model
        }
    });

    if (!user) {
        return false;
    }

    // Delete the user
    await user.destroy();
    return true;
}

const deleteUserMutation = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },  // Accept userId as argument
    },
    resolve: deleteUserResolver,
};

export default deleteUserMutation;
