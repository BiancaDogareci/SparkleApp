import { GraphQLInt } from 'graphql';
import postInputType from '../types/postInputType.js';
import postType from '../types/postType.js';
import db from '../../models/index.js';
import { attachLabelsToPost } from './attachLabelsToPost.js';

const updatePostMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const userId = context.user_id;

    const id = args.id;

    const post = await db.Post.findOne({
        where: {
            id,
        }
    });

    if(!post){
        return false;
    }


    if(userId===post.userId){
        const updated_post = {
            title: args.post.title,
            body: args.post.body,
            edited: 1,
        }

        await attachLabelsToPost(post.id,args.post.labels);
        const updatedPost = await post.update(updated_post);
        
    
        return updatedPost;

    }else{
        return post;
    }

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
