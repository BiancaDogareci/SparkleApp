import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';

const deletePostMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const userId = context.user_id;

    const post = await db.Post.findOne({
        where: {
            id: args.id,
        }
    })

    if(!post){
        return false;
    }

    if(userId===post.userId){
        await post.destroy();
        return true;
    }else{
        return false;
    }
}

const deletePostMutation = {
    type: GraphQLBoolean, 
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deletePostMutationResolver,
};

export default deletePostMutation;