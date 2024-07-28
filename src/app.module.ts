import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CognitoAuthModule } from "@nestjs-cognito/auth";
import { MedicosController } from "./medicos/controller/medicos.controller";
import { MedicosService } from "./medicos/services/medicos.services";
import { AppController } from "./app.controller";
import { ConsultaController } from "./consultas/controller/consulta.controller";
import { ConsultasService } from "./consultas/service/consulta.service";
import { GoogleCalendarService } from "./google-calendar/service/google-calendar.service";
import { MedicoModel } from "./medicos/model/medico.model";
import { ConsultaModel } from "./consultas/model/consulta.model";
import { HorarioDisponivelModel } from "./horarios-disponiveis/model/horario-disponivel.model";
import { HorariosDisponiveisService } from "./horarios-disponiveis/services/horarios-disponiveis.service";
import { HorariosDisponiveisController } from "./horarios-disponiveis/controller/horarios-disponiveis.controller";
import { ProntuarioModel } from "./prontuario/model/prontuario.model";
import { DocumentosController } from "./documentos/controller/documentos.controller";
import { ProntuarioController } from "./prontuario/controller/prontuario.controller";
import { DocumentosService } from "./documentos/services/documentos.service";
import { ProntuariosService } from "./prontuario/services/prontuario.service";
import { DocumentoModel } from "./documentos/model/documentos.model";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      MedicoModel,
      ConsultaModel,
      HorarioDisponivelModel,
      ProntuarioModel,
      DocumentoModel,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_HOST"),
        port: configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASS"),
        database: configService.get("DATABASE_NAME"),
        entities: [
          MedicoModel,
          ConsultaModel,
          HorarioDisponivelModel,
          ProntuarioModel,
          DocumentoModel,
        ],
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
          tokenUse: "id",
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController,
    MedicosController,
    ConsultaController,
    HorariosDisponiveisController,
    DocumentosController,
    ProntuarioController,
  ],
  providers: [
    MedicosService,
    HorariosDisponiveisService,
    ConsultasService,
    GoogleCalendarService,
    DocumentosService,
    ProntuariosService,
  ],
})
export class AppModule {}
