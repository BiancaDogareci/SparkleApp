import { GraphQLInt } from 'graphql';
import postInputType from '../types/postInputType.js';
import postType from '../types/postType.js';
import db from '../../models/index.js';

const updatePostMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        throw new Error("Unauthorized");  // Throw error for unauthorized access
    }

    const userId = context.user_id;

    const postId = args.id;

    // Fetch the post by ID
    const post = await db.Post.findOne({
        where: {
            postId,  // Make sure you're querying by postId (not id)
        }
    });

    if (!post) {
        throw new Error("Post not found");  // Throw error if post does not exist
    }

    // Ensure that the post belongs to the authenticated user
    if (userId === post.userId) {
        // Prepare the updated fields
        const updatedPostData = {
            title: args.post.title,
            body: args.post.body,
            edited: 1,  // Mark as edited
        };

        // Update the post in the database
        const updatedPost = await post.update(updatedPostData);

        return updatedPost;
    } else {
        throw new Error("You are not authorized to edit this post");  // Throw error for unauthorized access
    }
}

const updatePostMutation = {
    type: postType,
    args: {
        id: { type: GraphQLInt },  // Post ID
        post: { type: postInputType }  // Post input data
    },
    resolve: updatePostMutationResolver,
};

export default updatePostMutation;
