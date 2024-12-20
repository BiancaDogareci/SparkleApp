import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../models/index.js';


const deleteCommentMutationResolver = async (_, args, context) => {
  const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const userId = context.user_id;
    const comment = await db.Comment.findOne({
        where: {
            id: args.id,
        }
    });

    if(!comment){
        return false;
    }

    if(userId===comment.userId){
      await comment.destroy();
      return true;
  }else{
      return false;
  }
}

const deleteCommentMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteCommentMutationResolver,
};

export default deleteCommentMutation;