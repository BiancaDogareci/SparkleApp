import db from '../../models/index.js';
import reportType from '../types/reportType.js';
import reportInputType from '../types/reportInputType.js';

const createReportMutationResolver = async (_, {report}, context) => {
    const isAuthorized = !!context.user_id

    if(!isAuthorized) {
        throw new Error('User not authorized');
    }

    try{
    const newReport = await db.Report.create({
        reason: report.reason,
        userId: context.user_id,
        postId: report.postId
    });

    return newReport;
    
    }catch (error) {
        console.error(error);
        return null;
    }
};

const createReportMutation = {
    type: reportType,
    args: {
        report: {type: reportInputType},
    },
    resolve: createReportMutationResolver,
};

export default createReportMutation;