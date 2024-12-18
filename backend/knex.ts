const environment = process.env.NODE_ENV || "development"

import config from "./knexfile";
import knex from "knex";

const db = knex(config[environment]);

export default db;