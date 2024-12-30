import graphql from 'graphql';
import loginMutation from '../mutations/loginMutation.js';
import createUserMutation from '../mutations/createUserMutation.js';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import createPostMutation from '../mutations/createPostMutation.js';
import updatePostMutation from '../mutations/updatePostMutation.js';
import deletePostMutation from '../mutations/deletePostMutation.js';
import createLabelMutation from '../mutations/createLabelMutation.js';
import updateLabelMutation from '../mutations/updateLabelMutation.js';
import deleteLabelMutation from '../mutations/deleteLabelMutation.js';
import attachLabelsToPostsMutation from '../mutations/attachLabelsToPostMutation.js'
import createCommentMutation from '../mutations/createCommentMutation.js';
import updateCommentMutation from '../mutations/updateCommentMutation.js';
import deleteCommentMutation from '../mutations/deleteCommentMutation.js';
import createProfileMutation from '../mutations/createProfileMutation.js';
import updateProfileMutation from '../mutations/updateProfileMutation.js';
import deleteProfileMutation from '../mutations/deleteProfileMutation.js';

const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        login: loginMutation,

        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,

        createPost: createPostMutation,
        updatePost: updatePostMutation,
        deletePost: deletePostMutation,

        createLabel: createLabelMutation,
        updateLabel: updateLabelMutation,
        deleteLabel: deleteLabelMutation,

        attachLabelsToPosts: attachLabelsToPostsMutation,

        createComment: createCommentMutation,
        updateComment: updateCommentMutation,
        deleteComment: deleteCommentMutation,

        createProfile: createProfileMutation,
        updateProfile: updateProfileMutation,
        deleteProfile: deleteProfileMutation
    }
});

export default queryType;
