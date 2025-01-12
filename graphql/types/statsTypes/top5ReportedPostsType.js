import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import userType from '../userType.js';
import reportType from '../reportType.js';

const top5ReportedPostsType = new GraphQLObjectType({
    name: 'Top5ReportedPosts',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        edited: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        reportCount: { type: GraphQLInt },
        user: { type: userType },
        reports: { type: new GraphQLList(reportType) }
    }
});

export default top5ReportedPostsType;