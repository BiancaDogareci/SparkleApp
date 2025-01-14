import { GraphQLInt } from 'graphql';
import labelInputType from '../types/labelInputType.js';
import labelType from '../types/labelType.js';
import db from '../../models/index.js';

const updateLabelMutationResolver = async(_, args,context) =>{
    const isAuthorized = !!context.user_id;
    
    if (!isAuthorized) {
        return false;
    }
    const id = args.id;

    const label = await db.Label.findOne({
        where: {
            id,
        }
    });

    if(!label){
        return false;
    }

    const updatedLabel = await label.update({
        ...args.label,
    });

    return updatedLabel;
}

const updateLabelMutation = {
    type: labelType,
    args: {
        id: {type: GraphQLInt},
        label: {type: labelInputType}
    },
    resolve: updateLabelMutationResolver,
};

export default updateLabelMutation;
