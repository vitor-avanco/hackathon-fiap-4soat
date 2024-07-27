import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { TerminusModule } from '@nestjs/terminus';
import { MedicoEntity } from './medicos/entities/medicos.entity';
import { MedicosController } from './medicos/controller/medicos.controller';
import { MedicosModel } from './medicos/model/medicos.model';
import { AppController } from './app.controller';
import { AgendaController } from './agenda/controller/agenda.controller';
import { AgendaModel } from './agenda/model/agenda.model';
import { AgendaEntity } from './agenda/entities/agenda.entity';
import { ConsultaController } from './consultas/controller/consulta.controller';
import { ConsultaModel } from './consultas/model/consulta.model';
import { ConsultaEntity } from './consultas/entities/consulta.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MedicoEntity, AgendaEntity, ConsultaEntity]),
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        entities: [MedicoEntity, AgendaEntity, ConsultaEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: atob(configService.get("COGNITO_USER_POOL_ID") as string),
          clientId: atob(configService.get("COGNITO_CLIENT_ID")),
          tokenUse: 'id',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, MedicosController, AgendaController, ConsultaController],
  providers: [
    MedicosModel,
    AgendaModel,
    ConsultaModel
  ]
})
export class AppModule {}
