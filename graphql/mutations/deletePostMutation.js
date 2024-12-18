import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';

const deletePostMutationResolver = async (_, args, context) => {
    const post = await db.Post.findOne({
        where: {
            id: args.id,
        }
    })

    if(!post){
        return false;
    }

    await post.destroy();
    return true;
}

const deletePostMutation = {
    type: GraphQLBoolean, 
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deletePostMutationResolver,
};

export default deletePostMutation;