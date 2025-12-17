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
import { MoneyController } from './money/money.controller';
import { MoneyService } from './money/money.service';
import { TablesController } from './tables/tables.controller';
import { TablesService} from './tables/tables.service';
import { DecksService } from './decks/decks.service';
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
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ // ← ajouter ce module pour que JwtService soit injectable
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, MoneyController, TablesController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
    AppService,
    MoneyService,
    TablesService, 
    DecksService
  ],
})
export class AppModule {}
