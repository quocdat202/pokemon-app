import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHealth() {
    const dbStatus = this.dataSource.isInitialized;
    const dbName = this.dataSource.options.database;

    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStatus,
        name: dbName,
      },
      message: dbStatus
        ? 'Database connected successfully'
        : 'Database connection failed',
    };
  }

  async testDatabaseConnection() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        status: 'success',
        message: 'Database connection is working',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
