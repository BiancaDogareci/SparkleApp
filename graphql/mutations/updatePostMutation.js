import {GraphQLInt} from 'graphql';
import postInputType from '../types/postInputType.js';
import postType from '../types/postType.js';
import db from '../../models/index.js';

const updatePostMutationResolver = async (_, args, context) => {
    const id = args.id;
    const post = await db.Post.findOne({
        where: {
            id,
        }
    });
    if(!post){
        return false;
    }
    const updated_post = {
        title: args.post.title,
        body: args.post.body,
        edited: 1,
    }

    const updatedPost = await post.update(updated_post);

    return updatedPost;
}


const updatePostMutation = {
    type: postType,
    args: {
        id: {type:GraphQLInt},
        post: {type: postInputType}
    },
    resolve: updatePostMutationResolver,
}

export default updatePostMutation;