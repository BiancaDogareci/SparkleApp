import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import reportType from '../reportType.js';

const top5ReportedUsersType = new GraphQLObjectType({
    name: 'Top5ReportedUsers',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        reportCount: { type: GraphQLInt },
        reports: { type: new GraphQLList(reportType) }
    }
});

export default top5ReportedUsersType;