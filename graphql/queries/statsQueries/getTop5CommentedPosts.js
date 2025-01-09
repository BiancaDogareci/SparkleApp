import { GraphQLList } from 'graphql';
import db from '../../../models/index.js';
import top5CommentedPostsType from '../../types/statsTypes/top5CommentedPostsType.js';

const getTop5CommentedPostsResolver = async () => {
    //comentariile asociate fiecarui postId
   const topCommentedPostsIds = await db.Comment.findAll({
       attributes: [
           'postId',
           [db.Sequelize.fn('COUNT', db.Sequelize.col('postId')), 'commentCount']
       ],
       group: ['postId'],
       order: [[db.Sequelize.literal('commentCount'), 'DESC']],//sortare descrescatoare
       limit: 5
   });

   const topCommentedPosts = topCommentedPostsIds.map(comment => ({
       postId: comment.postId,
       commentCount: comment.get('commentCount')
   }));

   const postIds = topCommentedPosts.map(post => post.postId);
   //recuperam din baza de date autorii,comentariile si label-urile asociate celor mai comentate postari
   const posts = await db.Post.findAll({
       where: { id: postIds },
       include: [
           {
               model: db.User,
               attributes: ['id', 'name', 'username', 'email']
           },
           {
               model: db.Comment,
               attributes: ['id', 'body', 'edited']
           },
           {
               model: db.Label,
               attributes: ['name'],
               through: { attributes: [] }
           }
       ],
       raw: false
   });

   //adaugam nr de comentarii la postari
   const result = posts.map(post => ({
       ...post.get({ plain: true }),
       commentCount: parseInt(topCommentedPosts.find(p => p.postId === post.id)?.commentCount || 0, 10)
   }));

   result.sort((a, b) => b.commentCount - a.commentCount);
   return result;
};

const getTop5CommentedPostsQuery = {
   type: new GraphQLList(top5CommentedPostsType),
   resolve: getTop5CommentedPostsResolver
};

export default getTop5CommentedPostsQuery;