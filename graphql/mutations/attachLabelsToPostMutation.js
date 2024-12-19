import db from '../../models/index.js';
import {GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLString} from 'graphql';


const attachLabelsToPostMutationResolver = async (_, {postId, labels}, context) => {
    const isAuthorized = !!context.user_id

    if(!isAuthorized) {
        return false;
    }

    const post = await db.Post.findOne({
        where: {
            id: postId,
        }
    })

    if(!post){
        return false;
    }

    if(context.user_id===post.userId){
        const labelsToAdd = await Promise.all(labels.map(async (label) => {
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
    
        await post.addLabels(labelsToAdd);  
    
        return true;
    }else{
        return false;
    }
}

const attachLabelsToPostMutation = {
    type: GraphQLBoolean,
    args: {
        postId: {type: GraphQLInt},
        labels: {type: new GraphQLList(GraphQLString)}
    },
    resolve: attachLabelsToPostMutationResolver,
};

export default attachLabelsToPostMutation;