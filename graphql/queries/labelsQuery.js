import { GraphQLList } from 'graphql';
import labelType from '../types/labelType.js';
import db from '../../models/index.js';

const labelsQueryResolver = async () => {
    const labels = await db.Label.findAll();

    return labels;
}

const labelsQuery = {
    type: new GraphQLList(labelType),
    resolve: labelsQueryResolver,
};

export default labelsQuery;
