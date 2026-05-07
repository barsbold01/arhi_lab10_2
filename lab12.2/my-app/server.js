/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const { createServer } = require('http');
const next = require('next');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { Pool } = require('pg');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DATABASE || 'mydatabase',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  port: Number(process.env.POSTGRES_PORT || 5432),
});

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUsers: [User!]!
  }
`);

const root = {
  getUsers: async () => {
    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT id, name, email FROM users ORDER BY id ASC'
      );

      return result.rows;
    } catch (error) {
      console.error('PostgreSQL query aldaa:', error);
      return [];
    } finally {
      client.release();
    }
  },
};

app.prepare().then(() => {
  const server = express();

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  );

  server.use((req, res) => handle(req, res));

  const port = process.env.PORT || 4000;

  createServer(server).listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Server ${port} port deer ajillaj baina.`);
  });
});
