import labelInputType from '../types/labelInputType.js';
import labelType from '../types/labelType.js';
import db from '../../models/index.js';

const createLabelMutationResolver = async (_, { label }, context) => {
    const createdLabel = await db.Label.create({
        name: label.name,
        usage: label.usage,
    });

    return createdLabel;
}

const createLabelMutation = {
    type: labelType,
    args: {
        label: {type: labelInputType},
    },
    resolve: createLabelMutationResolver,
};

export default createLabelMutation;
