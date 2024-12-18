import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';


const deleteLabelMutationResolver = async (_, args, context) => {
    const label = await db.Label.findOne({
        where: {
            id: args.id,
        }
    });

    if(!label){
        return false;
    }

    await label.destroy();
    return true;
}

const deleteLabelMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteLabelMutationResolver,
};

export default deleteLabelMutation;