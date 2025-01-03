import { GraphQLObjectType } from 'graphql';

// General queries
import userQuery from '../queries/userQuery.js';
import usersQuery from '../queries/usersQuery.js';
import postQuery from '../queries/postQuery.js';
import postsQuery from '../queries/postsQuery.js';
import labelQuery from '../queries/labelQuery.js';
import labelsQuery from '../queries/labelsQuery.js';
import commentQuery from '../queries/commentQuery.js';
import commentsQuery from '../queries/commentsQuery.js';
import profileQuery from '../queries/profileQuery.js';
import profilesQuery from '../queries/profilesQuery.js';
import allLikesOfPostsQuery from '../queries/likepostsQuery.js';
import likesOfAPostQuery from '../queries/likepostOfAPostQuery.js';
import likesOfAUserQuery from '../queries/likepostOfAUserQuery.js';

// Stats queries
import getTop5LikedPostsQuery from '../queries/statsQueries/getTop5LikedPosts.js';

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

        profile: profileQuery,
        profiles: profilesQuery,

        allLikesOfPosts: allLikesOfPostsQuery,
        likesOfAPost: likesOfAPostQuery,
        likesOfAUser: likesOfAUserQuery,

        top5LikedPosts: getTop5LikedPostsQuery
    },
});

export default queryType;
