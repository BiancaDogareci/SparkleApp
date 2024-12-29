import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import postsQuery from '../queries/postsQuery.js';
import labelQuery from '../queries/labelQuery.js';
import labelsQuery from '../queries/labelsQuery.js';
import commentQuery from '../queries/commentQuery.js';
import commentsQuery from '../queries/commentsQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,

        post: postQuery,
        posts: postsQuery,

        label: labelQuery,
        labels: labelsQuery,
        
        comment: commentQuery,
        comments: commentsQuery,
    },
});

export default queryType;
