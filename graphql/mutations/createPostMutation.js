import db from '../../models/index.js';
import postType from '../types/postType.js';
import postInputType from '../types/postInputType.js';

const createPostMutationResolver = async (_, { post }, context) => {


    const isAuthorized = !!context.user_id;
   
    if (!isAuthorized) {
        throw new Error('Unauthorized');
    }

    // Validate input fields (ensure title and content are provided)
    if (!post.title || !post.content) {
        throw new Error('Title and content are required');
    }

    // Creating the post using the Sequelize model fields
    const createdPost = await db.Post.create({
        title: post.title,
        content: post.content, // 'content' is a valid field in your model
        userId: context.user_id,  // Associate the post with the logged-in user
        edited: false,  // Default value for 'edited'
    });


    // Process and associate labels (if any)
    if (post.labels && post.labels.length > 0) {
        const labels = await Promise.all(post.labels.map(async (label) => {
            const foundLabel = await db.Label.findOne({
                where: { name: label },
            });

            if (!foundLabel) {
                // If label doesn't exist, create it
                const createdLabel = await db.Label.create({
                    name: label,
                    usage: 1,  // Initial usage count
                });
                return createdLabel;
            } else {
                // If label exists, increment usage count and update it
                const updatedLabel = await foundLabel.update({
                    usage: foundLabel.usage + 1,
                });
                return updatedLabel;
            }
        }));

        // Associate the found or created labels with the post
        await createdPost.addLabels(labels);
    }

    // Return the created post with associated data (e.g., author)
    return createdPost;
};

const createPostMutation = {
    type: postType,
    args: {
        post: { type: postInputType },  // Expecting the 'post' argument to match the postInputType schema
    },
    resolve: createPostMutationResolver,
};

export default createPostMutation;
