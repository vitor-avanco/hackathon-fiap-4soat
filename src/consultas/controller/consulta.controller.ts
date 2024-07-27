import { Authorization, CognitoUser } from "@nestjs-cognito/auth";
import { Controller, Inject, Post, Param, Get } from "@nestjs/common";
import { ConsultaDTO } from "../dto/consulta.dto";
import { ConsultaModel } from "../model/consulta.model";
import { ConsultaStatus } from "../enum/consulta.enum";

@Controller('consulta')
export class ConsultaController {
    constructor(
        @Inject(ConsultaModel)
        private readonly consulta: ConsultaModel
    ) {}


    @Post('/:id')
    @Authorization(['customers'])
    async criar(
      @CognitoUser('username') username: string,
      @CognitoUser('name') name: string,
      @CognitoUser('email') email: string,
      @Param('id') id: string
    ){
        const consulta = new ConsultaDTO();
        consulta.agendaId = id;
        consulta.pacienteDocumento = username;
        consulta.pacienteNome = name;
        consulta.pacienteEmail = email;
        consulta.status = ConsultaStatus.AGENDADO;
        return this.consulta.salvar(consulta);
    }

    @Post('/:id/:status')
    @Authorization(['customers'])
    async alterarStatus(
        @Param('id') consultaId: string,
        @Param('status') status: ConsultaStatus,
    ){
        return this.consulta.alterarStatus(consultaId, status);
    }

    @Get('/:id')
    @Authorization(['customers'])
    async buscarConsultaPorId(
        @Param('id') id: string
    ){
        return this.consulta.buscarConsultaPorId(id);
    }
}