import { DataSource } from 'typeorm';
import { join } from 'path';
import { CustomLogger } from '@/utils/typeorm-logging';
import config from '@/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: false,
  logger: new CustomLogger({ enabled: true, language: 'postgresql' }),
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrationsRun: config.node.env === 'prod',
});
