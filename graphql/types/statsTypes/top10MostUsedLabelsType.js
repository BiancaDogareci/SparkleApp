import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import postType from '../postType.js';



const top10MostUsedLabelsType= new GraphQLObjectType({
    name: 'Top10MostUsedLabels',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        usage: { type: GraphQLInt },
        posts:{ type: new GraphQLList(postType)}  
    },
   
});

export default top10MostUsedLabelsType;
