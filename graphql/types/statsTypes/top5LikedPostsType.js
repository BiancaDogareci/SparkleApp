import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql';
import userType from '../userType.js';

const top5LikedPostsType = new GraphQLObjectType({
    name: 'Top5LikedPosts',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        edited: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        likeCount: { type: GraphQLInt }, // ce e in plus fata de postType
        User: {
            type: userType
        }
    }
});

export default top5LikedPostsType;
