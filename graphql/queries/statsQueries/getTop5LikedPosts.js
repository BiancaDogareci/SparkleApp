import { GraphQLList } from 'graphql';
import db from '../../../models/index.js';
import top5LikedPostsType from '../../types/statsTypes/top5LikedPostsType.js';

const getTop5LikedPostsResolver = async () => {
    // Gasim id-urile celor mai apreciate 5 postari si numarul de like-uri
    const topLikedPostsIds = await db.LikePost.findAll({
        attributes: [
            'postId',
            [db.Sequelize.fn('COUNT', db.Sequelize.col('postId')), 'likeCount']
        ],
        group: ['postId'],
        order: [[db.Sequelize.literal('likeCount'), 'DESC']],
        limit: 5
    });

    // Pastram din ce am extras din LikePost doar postId si likeCount pt fiecare postare
    // Ramane un array de tipul: [{ postId, likeCount }, ...]
    const topLikedPosts = topLikedPostsIds.map(like => ({
        postId: like.postId, // asa accesam atribute obisnuite
        likeCount: like.get('likeCount') // asa accesam un atribut virtual creat cu COUNT etc.
    }));

    // Pastram doar id-urile postarilor intr-un array
    const postIds = topLikedPosts.map(post => post.postId);

    // Gasim postarile si autorii in functie de id-urile extrase anterior
    const posts = await db.Post.findAll({
        where: {
            id: postIds
        },
        attributes: ['id', 'title', 'body', 'edited', 'createdAt', 'updatedAt'],
        include: [
            {
                model: db.User,
                attributes: ['id', 'name', 'username', 'email']
            }
        ]
    });

    // Combinam postarile si autorii abia extrasi cu likeCount
    const result = posts.map(post => {
        const likeData = topLikedPosts.find(like => like.postId === post.id);
        return {
            ...post.toJSON(),
            likeCount: parseInt(likeData?.likeCount || 0, 10)
        };
    });

    // Sortam descrescator dupa likeCount
    result.sort((a, b) => b.likeCount - a.likeCount);

    return result;
};

const getTop5LikedPostsQuery = {
    type: new GraphQLList(top5LikedPostsType),
    resolve: getTop5LikedPostsResolver,
};

export default getTop5LikedPostsQuery;
