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
import likecommentOfACommentQuery from '../queries/likecommentOfACommentQuery.js';
import likecommentOfAUserQuery from '../queries/likecommentOfAUserQuery.js';
import allLikesOfCommentsQuery from '../queries/likecommentQuery.js';
import repliesQuery from '../queries/repliesQuery.js';
import getNumberReportsForPostQuery from '../queries/getNumberReportsForPost.js';
import getNumberReportsForUserQuery from '../queries/getNumberReportsForUser.js';
import reportsOfAPostQuery from '../queries/reportsOfAPostQuery.js';
import reportsWrittenByAUserQuery from '../queries/reportsWrittenByAUserQuery.js';
import reportsOfAUserQuery from '../queries/reportsOfAUserQuery.js';

// Stats queries
import getTop5LikedPostsQuery from '../queries/statsQueries/getTop5LikedPosts.js';
import getTop5CommentedPostsQuery from '../queries/statsQueries/getTop5CommentedPosts.js';
import getTop5ReportedPostsQuery from '../queries/statsQueries/getTop5ReportedPosts.js';
import getTop5ReportedUsersQuery from '../queries/statsQueries/getTop5ReportedUsers.js';
import getTop10MostUsedLabelsQuery from '../queries/statsQueries/getTop10MostUsedLabels.js';

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
        replies: repliesQuery,

        profile: profileQuery,
        profiles: profilesQuery,

        allLikesOfPosts: allLikesOfPostsQuery,
        likesOfAPost: likesOfAPostQuery,
        likesOfAUser: likesOfAUserQuery,

        likecommentOfAComment:likecommentOfACommentQuery,
        likeCommentofAUser:likecommentOfAUserQuery,
        allLikesOfComments:allLikesOfCommentsQuery,

        getNumberReportsForPost: getNumberReportsForPostQuery,
        getNumberReportsForUser: getNumberReportsForUserQuery,
        reportsOfAPost: reportsOfAPostQuery,
        reportsWrittenByAUser: reportsWrittenByAUserQuery,
        reportsOfAUser: reportsOfAUserQuery,

        top5LikedPosts: getTop5LikedPostsQuery,
        top5CommentedPosts: getTop5CommentedPostsQuery,
        top5ReportedPosts: getTop5ReportedPostsQuery,
        top5ReportedUsers: getTop5ReportedUsersQuery,
        top10MostUsedLabels: getTop10MostUsedLabelsQuery
    },
});

export default queryType;
