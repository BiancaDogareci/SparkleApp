import {GraphQLObjectType, GraphQLInt} from 'graphql';
import postType from './postType.js';
import labelType from './labelType.js';

const postlabelType = new GraphQLObjectType({
    name: 'PostLabel',
    fields: {
        postId: {type: GraphQLInt},
        labelId: {type: GraphQLInt}
    }
});

export default postlabelType;