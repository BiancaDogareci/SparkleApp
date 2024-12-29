import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import labelType from '../types/labelType.js';

const labelQueryResolver = async (_, { id }) =>{
    const label = await db.Label.findOne({
        where: {
            id,
        }
    });

    if(!label){
        return null;
    }

    return label;
}

const labelQuery = {
    type: labelType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: labelQueryResolver,
};

export default labelQuery;
