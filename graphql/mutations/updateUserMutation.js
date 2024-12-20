import graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import userType from '../types/userType.js';
import db from '../../models/index.js';
import bcrypt from 'bcrypt';

const updateUserMutationResolver = async (_, args) => {
    const id = args.id;

    // Find the user by id
    const user = await db.User.findOne({
        where: {
            userId: id,  // Use userId to match the updated model
        }
    });

    if (!user) {
        return false;  // Return false if the user does not exist
    }

    // Update the user with the provided data
    const updatedUser = await user.update({
        userName: args.user.userName,    // Ensure to use userName, email, etc.
        email: args.user.email,
        firstName: args.user.firstName,
        lastName: args.user.lastName,
        password: args.user.password ? await bcrypt.hash(args.user.password, 5) : user.password, // Hash new password if provided
    });

    return updatedUser;  // Return the updated user object
}

const updateUserMutation = {
    type: userType,
    args: {
        id: { type: graphql.GraphQLInt },
        user: { type: userInputType },  // Ensure the input type is consistent with model fields
    },
    resolve: updateUserMutationResolver,
};

export default updateUserMutation;
