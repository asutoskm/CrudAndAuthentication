import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // CoreModule contains essential services and configurations
    CoreModule,
    // CatsModule is responsible for all cat-related operations
    CatsModule,
    // TypeOrmModule establishes the database connection using environment variables or defaults
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'post',
      database: process.env.POSTGRES_DB || 'testnest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.TYPEORM_SYNC === 'true', // Caution: set to 'false' in production
      logging: process.env.TYPEORM_LOGGING === 'true',
    }),
    // UserModule handles user-related functionality
    UserModule,
    // AuthModule takes care of authentication mechanisms
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}