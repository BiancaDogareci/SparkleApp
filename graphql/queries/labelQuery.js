import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import labelType from '../types/labelType.js';

// Resolver for fetching a label by its id
const labelQueryResolver = async (_, { id }) => {
  // Check for a label using the correct column name (labelId)
  const label = await db.Label.findOne({
    where: {
      labelId: id, // Make sure you are referencing the correct column name
    },
  });

  if (!label) {
    // Return null if the label is not found
    return null;
  }

  // Return the label object if found
  return label;
};

const labelQuery = {
  type: labelType,  // Define the return type as labelType
  args: {
    id: { type: GraphQLInt },  // Define the input argument as an integer
  },
  resolve: labelQueryResolver,  // Set the resolve function
};

export default labelQuery;
