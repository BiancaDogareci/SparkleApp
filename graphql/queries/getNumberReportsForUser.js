import db from '../../models/index.js';
import { GraphQLInt } from 'graphql';

const getNumberReportsForUserResolver = async (_ , args) => {
    const { id } = args; 
    const user = await db.User.findOne({
        where: {
            id,
        }
    });
    if(!user){
        return 0;
    }else{
        const numberReportsForUser = await db.Report.findAll({
            include: [{
                model: db.Post,
                attributes: ['userId'],
                where: {
                    userId: id
                }
            }],
            attributes: [
                [db.Sequelize.fn('COUNT', db.Sequelize.col('Report.id')), 'reportCount']
            ],
            group: ['Post.userId'],
            raw: true
        });
        return parseInt(numberReportsForUser[0]?.reportCount || 0, 10);
    }
}

const getNumberReportsForUserQuery = {
    type: GraphQLInt,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: getNumberReportsForUserResolver
};

export default getNumberReportsForUserQuery; 