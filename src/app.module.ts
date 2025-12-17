import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db', // fichier de la base de données
      entities: [User], // toutes les entités
      synchronize: true, // crée automatiquement les tables
      autoLoadEntities: true,
    }),
    JwtModule.register({ // ← ajouter ce module pour que JwtService soit injectable
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
    AppService
  ],
})
export class AppModule {}
