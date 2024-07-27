import {
    Controller,
    Inject,
    Get,
    Param,
    Body,
    Post,
    BadRequestException,
    Put,
    Delete,
    Patch,
  } from '@nestjs/common';
import { AgendaModel } from '../model/agenda.model';
import { AgendaDTO } from '../dto/agenda.dto';
import { Authorization, CognitoUser } from '@nestjs-cognito/auth';

@Controller('agenda')
export class AgendaController {
    constructor(
        @Inject(AgendaModel)
        private readonly agenda: AgendaModel
    ) {}


    @Post()
    @Authorization(['doctors'])
    async criar(
        @CognitoUser('custom:id') customId: string,
        @Body() agenda: AgendaDTO): Promise<any> {
            try {
                agenda.medicoId = customId;
                const novoHorario = await this.agenda.criar(agenda);
                return novoHorario;
            } catch (error) {
            throw new BadRequestException(error.message);
            }
      }
    @Get('/medico/:medicoId')
    findByDoctorId(@Param('medicoId') medicoId: string): Promise<AgendaDTO[]> {
        return this.agenda.buscaAgendaDoMedico(medicoId);
    }

    @Get(':id')
    get(@Param('id') id: string): Promise<AgendaDTO> {
        return this.agenda.buscarAgendamentoPorId(id);
    }
    
    @Authorization(['doctors'])
    @Put(':id')
    update(@Param('id') id: string, @Body() agenda: any): Promise<void> {
        return this.agenda.atualizar(id, agenda);
    }

    @Authorization(['doctors'])
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.agenda.apagar(id);
    }

    @Patch(':id/confirmado')
    markAsBooked(@Param('id') id: string): Promise<void> {
        return this.agenda.atualizarStatusAgendamento(id, true);
    }

    @Patch(':id/desmarcar')
    markAsFree(@Param('id') id: string): Promise<void> {
        return this.agenda.atualizarStatusAgendamento(id, false);
    }
}
