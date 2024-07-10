import * as process from 'node:process';
import * as dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

interface Config {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  node: {
    env: string;
  };
}

const config: Config = {
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  node: {
    env: process.env.NODE_ENV,
  },
};

export default config;
