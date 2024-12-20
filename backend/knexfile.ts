import type { Knex } from "knex";
import 'dotenv/config'

// import * as dotenv from "dotenv"
// dotenv.config()

console.log(`Hello, ${process.env.DB_NAME}`);

const config: { [key: string]: Knex.Config }  = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }

};

export default config;
