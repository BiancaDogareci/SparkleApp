import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLSchema } from 'graphql';
import queryType from './graphql/rootTypes/queryType.js';
import mutationType from './graphql/rootTypes/mutationType.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants.js';

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const app = express();

// JWT middleware to verify token
const jwtMiddleware = (req, res, next) => {
    console.log("JWT Middleware called");  // Add this log
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("Authorization header:", req.headers.authorization);  // Log the full Authorization header
  
    if (!token) {
      console.log("No token provided");
      next();
      return;
    }
  
    try {
      const decodedPayload = jwt.verify(token, JWT_SECRET);
      console.log("Decoded Payload:", decodedPayload);  // Log the decoded payload
      req.user_id = decodedPayload.user_id;  // Set user_id to req.user_id
      console.log("UserId set in req.user_id:", req.user_id);  // Log to verify the user_id
      
      // Add a short delay for debugging purposes
      setTimeout(() => {
        next();
      }, 100);  // 100ms delay to check timing issues
    } catch (e) {
      console.log("Invalid Token", e);
      next();  // Proceed even if the token is invalid
    }
    console.log("JWT Middleware finished");  // Add this log
  };
  
// Define your GraphQL endpoint and use the middleware
app.all(
  "/graphql",
  jwtMiddleware, // Apply the JWT middleware here
  createHandler({
    schema: schema,
    context: (req) => {
      let user_id = req.user_id; // Attempt to read from middleware
  
      if (!user_id && req.headers.authorization) {
        try {
          const token = req.headers.authorization.replace("Bearer ", "");
          const decodedPayload = jwt.verify(token, JWT_SECRET);
          user_id = decodedPayload.user_id;
          console.log("Fallback decoded user_id:", user_id);
        } catch (e) {
          console.log("Failed to decode token in context", e);
        }
      }
  
      return { user_id };
    },
  })
   
);

app.get((req, res) => {
  res.send("ok");
});

export default app;
