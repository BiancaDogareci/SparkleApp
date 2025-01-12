import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import reportType from '../types/reportType.js';

const reportsWrittenByAUserQueryResolver = async (_ , args) => {
    const { userId } = args
    const user = await db.User.findOne({
        where: {
            id: userId
        }
    });
    if(!user){
        return null;
    }else{
        const reportsWrittenByAUser = await db.Report.findAll({
            where: {
                userId
            },
        });
        return reportsWrittenByAUser;
    }
}

const reportsWrittenByAUserQuery = {
    type: new GraphQLList(reportType),
    args: {
        userId: { type: GraphQLInt },
    },
    resolve: reportsWrittenByAUserQueryResolver,
};

export default reportsWrittenByAUserQuery;