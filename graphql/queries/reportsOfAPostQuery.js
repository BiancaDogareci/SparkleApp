import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import reportType from '../types/reportType.js';

const reportsOfAPostQueryResolver = async (_ , args) => {
    const { postId } = args
    const post = await db.Post.findOne({
        where: {
            id: postId
        }
    });
    if(!post){
        return null;
    }else{
        const reportsOfAPost = await db.Report.findAll({
            where: {
                postId
            },
        });
        return reportsOfAPost;
    }
}

const reportsOfAPostQuery = {
    type: new GraphQLList(reportType),
    args: {
        postId: { type: GraphQLInt },
    },
    resolve: reportsOfAPostQueryResolver,
};

export default reportsOfAPostQuery;