import { GraphQLList } from 'graphql';
import db from '../../../models/index.js';
import top5ReportedUsersType from '../../types/statsTypes/top5ReportedUsersType.js';

const getTop5ReportedUsersResolver = async () => {

    const topReportedUsersIds = await db.Report.findAll({
        include: [{
            model: db.Post,
            attributes: [
                'userId'
            ]
        }],
        attributes: [
            [db.Sequelize.fn('COUNT', db.Sequelize.col('Post.userId')), 'reportCount']
        ],
        group: ['Post.userId'],
        order: [[db.Sequelize.literal('"reportCount"'), 'DESC']],
        limit: 5
    });

    const topReportedUsers = topReportedUsersIds.map(report => ({
        userId: report.Post.userId,
        reportCount: report.get('reportCount')
    }));

    const userIds = topReportedUsers.map(user => user.userId);

    const users = await db.User.findAll({
        where: { id: userIds },
        include: [
            {
                model: db.Post,
                include: [{
                    model: db.Report,
                    attributes: [
                        'id',
                        'reason',
                        'userId',
                        'postId'
                    ]
                }],
                attributes: [
                    'id',
                    'title',
                    'body',
                    'edited'
                ],
            }
        ],
        attributes: [
            'id',
            'name',
            'username',
            'email'
        ],
        raw: false
    });

    const result = users.map(user => ({
        ...user.get({ plain: false }),
        reportCount: parseInt(topReportedUsers.find(u => u.userId === user.id)?.reportCount || 0, 10),
        reports: user.Posts.flatMap(post => post.Reports || []) 
    }));

    result.sort((a,b) => b.reportCount - a.reportCount);

    return result;

};

const getTop5ReportedUsersQuery = {
    type: new GraphQLList(top5ReportedUsersType),
    resolve: getTop5ReportedUsersResolver
};

export default getTop5ReportedUsersQuery;