
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import userType from '../userType.js';
import commentType from '../commentType.js';
import labelType from '../labelType.js';

const top5CommentedPostsType = new GraphQLObjectType({
    name: 'Top5CommentedPosts',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        edited: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        commentCount: { type: GraphQLInt },
        User: { type: userType },
        Comments: { type: new GraphQLList(commentType) },
        Labels: { type: new GraphQLList(labelType) }
    }
});

export default top5CommentedPostsType;