import { Authorization, CognitoUser } from "@nestjs-cognito/auth";
import {
  Controller,
  Inject,
  Post,
  Param,
  Get,
  Body,
  Patch,
} from "@nestjs/common";
import { ConsultaDTO, UpdateConsultaDTO } from "../dto/consulta.dto";
import { ConsultasService } from "../service/consulta.service";
import { ConsultaStatus } from "../enum/consulta.enum";

@Controller("consulta")
export class ConsultaController {
  constructor(
    @Inject(ConsultasService)
    private readonly consulta: ConsultasService,
  ) {}

  @Post()
  @Authorization(["customers"])
  async criar(
    @CognitoUser("username") username: string,
    @CognitoUser("name") name: string,
    @CognitoUser("email") email: string,
    @Body() consulta: ConsultaDTO,
  ) {
    consulta.pacienteDocumento = username;
    consulta.pacienteNome = name;
    consulta.pacienteEmail = email;
    consulta.status = ConsultaStatus.AGUARDANDO_CONFIRMACAO_MEDICO;
    return this.consulta.create(consulta);
  }

  @Patch("/:id")
  @Authorization(["customers", "doctors"])
  async alterar(
    @Param("id") consultaId: string,
    @Body() consulta: UpdateConsultaDTO,
  ) {
    return this.consulta.update(consultaId, consulta);
  }

  @Get("/:id")
  @Authorization(["customers", "doctors"])
  async buscarConsultaPorId(@Param("id") id: string) {
    return this.consulta.findOne(id);
  }
}
