# Sparkle App - GraphQL API

Sparkle is a Twitter-like application that allows users to share short posts, interact with content and connect with others in a dynamic social media environment.

## Features

The Sparkle API supports the following core features:

1. **User Management**:

   - Create, edit, delete user accounts
   - Get all users or a specific user
   - Authentication and authorization for secure access
   - Create, edit, delete user profiles
   - Get all profiles or a specific profile

2. **Posts (Sparks)**:

   - Create, edit, delete posts ("sparks")
   - Fetch all sparks or a specific spark
   - Add labels to sparks + create, update, delete, fetch labels

3. **Comments**:

   - Add, edit, delete comments on sparks
   - Support for nested comments with a depth limit of 2

4. **Likes**:

   - Like or unlike posts and comments
   - Retrieve users who liked a specific post/comment
   - Retrieve posts/comments that were liked by a specific user

5. **Reports**:
   - Add report to a user or post
   - List all reports recieved by a post
   - List all reports recieved by a user
   - List all reports written by a user

6. **Stats queries**:
   - Get top 5 most liked posts
   - Get top 5 most commented posts
   - Get top 5 most reported posts
   - Get top 5 most reported users
   - Get top 10 most used labels

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: SQLite database stored in the `db.sqlite` file, Sequelize ORM
- **API**: GraphQL
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (>=16.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/SparkleApp.git
   cd SparkleApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run database migrations and seeders:

   ```bash
   npx sequelize db:migrate
   npx sequelize db:seed:all
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server will be running at `http://localhost:3001`.

You can access the GraphQL endpoint at `http://localhost:3001/graphql`.

## Example Queries

In the `test_queries.txt` file.
