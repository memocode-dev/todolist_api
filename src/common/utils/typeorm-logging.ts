import { Logger } from 'typeorm';
import * as winston from 'winston';
import * as sqlFormatter from 'sql-formatter';
import { SqlLanguage } from 'sql-formatter';
import { highlight } from 'sql-highlight';
import { QueryRunner } from 'typeorm/query-runner/QueryRunner';

class QueryTimingHelper {
  private static queryStartTimes: Map<QueryRunner, number> = new Map();

  static startTiming(queryRunner: QueryRunner) {
    const startTime = performance.now();
    QueryTimingHelper.queryStartTimes.set(queryRunner, startTime);
  }

  static endTiming(queryRunner: QueryRunner): number {
    const startTime = QueryTimingHelper.queryStartTimes.get(queryRunner);
    if (startTime) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      QueryTimingHelper.queryStartTimes.delete(queryRunner);
      return duration;
    }
    return 0;
  }
}

export class CustomLogger implements Logger {
  private logger: winston.Logger;
  private readonly enabled: boolean;
  private readonly language: SqlLanguage;

  constructor({
    enabled,
    language,
  }: {
    enabled: boolean;
    language: SqlLanguage;
  }) {
    this.enabled = enabled;
    this.language = language;

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  private formatQuery({
    query,
    language,
  }: {
    query: string;
    language: SqlLanguage;
  }): string {
    return sqlFormatter.format(query, {
      language: language,
      keywordCase: 'upper',
    });
  }

  private colorizeQuery(query: string): string {
    return highlight(query);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.enabled) return;

    if (queryRunner) {
      QueryTimingHelper.startTiming(queryRunner);
      const executionTimeMs = QueryTimingHelper.endTiming(queryRunner);
      const executionTimeS = (executionTimeMs / 1000).toFixed(8);
      const formattedQuery = this.formatQuery({
        query: query,
        language: this.language,
      });
      const colorizedQuery = this.colorizeQuery(formattedQuery);
      this.logger.info(
        `Query: \n${colorizedQuery} \nParameters: ${JSON.stringify(
          parameters,
        )} \nExecution time: ${executionTimeS}s`,
      );
    }
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    if (!this.enabled) return;

    const formattedQuery = this.formatQuery({
      query: query,
      language: this.language,
    });
    const colorizedQuery = this.colorizeQuery(formattedQuery);
    this.logger.error(
      `Query Failed: \n${colorizedQuery} \nParameters: ${JSON.stringify(
        parameters,
      )} \nError: ${error}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    if (!this.enabled) return;

    const formattedQuery = this.formatQuery({
      query: query,
      language: this.language,
    });
    const colorizedQuery = this.colorizeQuery(formattedQuery);
    this.logger.warn(
      `Query is slow: \n${colorizedQuery} \nParameters: ${JSON.stringify(
        parameters,
      )} \nExecution time: ${time}`,
    );
  }

  logSchemaBuild(message: string) {
    if (!this.enabled) return;

    this.logger.info(message);
  }

  logMigration(message: string) {
    if (!this.enabled) return;

    this.logger.info(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (!this.enabled) return;

    if (level === 'log') {
      this.logger.info(message);
    } else if (level === 'info') {
      this.logger.info(message);
    } else if (level === 'warn') {
      this.logger.warn(message);
    }
  }
}
