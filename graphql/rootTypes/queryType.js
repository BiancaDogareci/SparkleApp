import { GraphQLObjectType } from 'graphql';
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import labelQuery from '../queries/labelQuery.js';
import commentQuery from '../queries/commentQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        post: postQuery,
        label: labelQuery,
        comment: commentQuery,
    },
});


export default queryType;