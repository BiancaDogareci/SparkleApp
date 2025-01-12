import { GraphQLList } from 'graphql';
import db from '../../../models/index.js';
import top5ReportedPostsType from '../../types/statsTypes/top5ReportedPostsType.js'


const getTop5ReportedPostsResolver = async () => {
    const topReportedPostsIds = await db.Report.findAll({
        attributes: [
            'postId',
            [db.Sequelize.fn('COUNT', db.Sequelize.col('postId')), 'reportCount']
        ],
        group: ['postId'],
        order: [[db.Sequelize.literal('reportCount'), 'DESC']],
        limit: 5
    });

    const topReportedPosts = topReportedPostsIds.map(report => ({
        postId: report.postId,
        reportCount: report.get('reportCount')
    }));

    const postIds = topReportedPosts.map(post => post.postId);

    const posts = await db.Post.findAll({
        where: { id: postIds },
        attributes: ['id', 'title', 'body', 'edited', 'createdAt', 'updatedAt', 'userId'],
        include: [
            {
                model: db.User,
                attributes: ['id', 'name', 'username', 'email']
            },
            {
                model: db.Report,
                attributes: ['id','reason','postId']
            }
        ],
        raw:false
    });

    const result = posts.map(post => ({
        ...post.get({ plain: false }),
        reportCount: parseInt(topReportedPosts.find(p => p.postId === post.id)?.reportCount || 0, 10),
        user: post.User,
        reports: post.Reports
    }));

    result.sort((a, b) => b.reportCount - a.reportCount);
    return result;
};


const getTop5ReportedPostsQuery = {
    type: new GraphQLList(top5ReportedPostsType),
    resolve: getTop5ReportedPostsResolver
};

export default getTop5ReportedPostsQuery;