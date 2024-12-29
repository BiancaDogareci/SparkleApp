import { GraphQLBoolean, GraphQLInt } from 'graphql';
import db from '../../models/index.js';

const deleteUserResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized||context.user_id!=args.id) {
        return false;
    }

    const user = await db.User.findOne({
        where: {
            id: args.id,
        }
    });

    if (!user) {
        return false;
    }

    //unlink labels
    const posts = await db.Post.findAll({ where: { userId: args.id } });

    for (const post of posts) {
        const labels = await post.getLabels();

        //decrease usage
        for (const label of labels) {
            if(label.usage>0)
            {
            const newUsageCount = label.usage - 1;
            await label.update({ usage: newUsageCount });
            }


        }

        await post.setLabels([]);
    }

    //delete posts
    await db.Post.destroy({
        where: {
            userId: args.id
        }
    });

    //delete user
    await user.destroy();
    
    return true;
};

const deleteUserMutation = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteUserResolver, 
};

export default deleteUserMutation;
