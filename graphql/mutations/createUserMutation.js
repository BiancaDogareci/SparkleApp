import userInputType from '../types/userInputType.js';
import db from '../../models/index.js';
import userType from '../types/userType.js';
import bcrypt from 'bcrypt';

const createUserMutationResolver = async (_, { user }, context) => {
    // Hash the password
    const password = await bcrypt.hash(user.password, 5);

    // Create the new user, ensuring we use the correct fields from the model
    const createdUser = await db.User.create({
        userName: user.userName,      // Use userName instead of name
        email: user.email,            // Use email field
        firstName: user.firstName,    // Use firstName field
        lastName: user.lastName,      // Use lastName field
        password: password,           // Hash password before saving
    });

    return createdUser;
}

const createUserMutation = {
    type: userType,
    args: {
        user: { type: userInputType },  // Ensure the input type matches the fields
    },
    resolve: createUserMutationResolver,
};

export default createUserMutation;
