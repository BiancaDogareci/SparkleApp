import { GraphQLList } from 'graphql';
import db from '../../../models/index.js';
import top10MostUsedLabelsType from '../../types/statsTypes/top10MostUsedLabelsType.js';

const getTop10MostUsedLabelsResolver = async () => {
    //ordonam label-urile dupa usage count
    //pastram top 10
    const topLabels = await db.Label.findAll({
        attributes: [
            'id',
            'name',
            'usage',
        ],
        order: [['usage', 'DESC']],
        limit: 10,
        include: [{
            model: db.Post,
            through: {
                attributes: []
            }
        }],
        raw: false
    });

    //returnam postarile asociate cu label-urile
    const result = await Promise.all(topLabels.map(async (label) => {
        const posts = await db.Post.findAll({
            include: [{
                model: db.Label,
                where: { id: label.id }
            }],
            raw: false
        });

        return {
            id: label.id,
            name: label.name,
            usage: label.usage,
            posts: posts
        };
    }));

    return result;
};

const getTop10MostUsedLabelsQuery = {
    type: new GraphQLList(top10MostUsedLabelsType),
    resolve: getTop10MostUsedLabelsResolver
};

export default getTop10MostUsedLabelsQuery;