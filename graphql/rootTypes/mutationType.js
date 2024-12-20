import graphql from 'graphql';
import createUserMutation from '../mutations/createUserMutation.js';
import updateUserMutation from '../mutations/updateUserMutation.js';
import deleteUserMutation from '../mutations/deleteUserMutation.js';
import loginMutation from '../mutations/loginMutation.js';
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


const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
        login: loginMutation,
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
    }
});


export default queryType;