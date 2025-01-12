import db from '../../models/index.js';
import { GraphQLInt } from 'graphql';

const getNumberReportsForPostResolver = async (_, args) => {
    const { id } = args; 
    const post = await db.Post.findOne({
        where: {
            id,
        }
    });
    if(!post){
        return 0;
    }else{
        const numberReportsForPost = await db.Report.findAll({
            attributes: [
                [db.Sequelize.fn('COUNT', db.Sequelize.col('postId')), 'reportCount']
            ],
            group: ['postId'],
            where: {
                postId: id
            },
            raw: true
        });
        return parseInt(numberReportsForPost[0]?.reportCount || 0, 10);
    }
}

const getNumberReportsForPostQuery = {
    type: GraphQLInt,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: getNumberReportsForPostResolver
};

export default getNumberReportsForPostQuery;