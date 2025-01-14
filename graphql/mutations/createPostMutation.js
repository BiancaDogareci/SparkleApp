import db from '../../models/index.js';
import postType from '../types/postType.js';
import postInputType from '../types/postInputType.js';

const createPostMutationResolver = async (_, { post }, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }
    
    const createdPost = await db.Post.create({
       title: post.title,
       body: post.body,
       userId: context.user_id,
       edited: 0,
    });
    const labels = await Promise.all(post.labels.map(async (label) => {
        const foundLabel = await db.Label.findOne({
                            where: {
                                name: label
                            }
                        });
        if(!foundLabel){
            const createdLabel = await db.Label.create({
                                    name: label,
                                    usage: 0,
                                });
            return createdLabel;
        }else{
            const usage = foundLabel.usage + 1;
            const updatedLabel = await foundLabel.update({
                usage: usage,
            });
            return updatedLabel;
        }
    })); 
    await createdPost.addLabels(labels);         
    return createdPost;  
}

const createPostMutation = {
    type: postType,
    args: {
        post: {type: postInputType},
    },
    resolve: createPostMutationResolver,
};

export default createPostMutation;
