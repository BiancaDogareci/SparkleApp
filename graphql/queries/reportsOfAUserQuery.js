import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import reportType from '../types/reportType.js';

const reportsOfAUserQueryResolver = async (_ , args) => {
    const { userId } = args
    const user = await db.User.findOne({
        where: {
            id: userId
        }
    });
    if(!user){
        return null;
    }else{
        const reportsOfAUser = await db.Report.findAll({
            include: {
                model: db.Post,
                attributes: ['userId'],
                where: {
                    userId: userId,
                }
            }
        });
        return reportsOfAUser;
    }
}

const reportsOfAUserQuery = {
    type: new GraphQLList(reportType),
    args: {
        userId: { type: GraphQLInt },
    },
    resolve: reportsOfAUserQueryResolver,
};

export default reportsOfAUserQuery;