import { GraphQLInt } from 'graphql';
import userType from '../types/userType.js';
import db from '../../models/index.js';

const userQueryResolver = async (_, { id }) => {
    const user = await db.User.findOne({
        where: {
            userId: id,  // Use userId here instead of id
        }
    });

    if (!user) {
        return null;
    }

    return user;
};

const userQuery = {
    type: userType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: userQueryResolver,
};

export default userQuery;
