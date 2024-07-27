import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AgendaEntity } from "../entities/agenda.entity";
import { AgendaDTO } from "../dto/agenda.dto";

@Injectable()
export class AgendaModel {
    constructor(
        @InjectRepository(AgendaEntity)
        private readonly repository: Repository<AgendaEntity>,
    ) {}

     async criar(agenda: AgendaDTO): Promise<AgendaEntity> {
        const medicoId = agenda.medicoId;
        const data = agenda.data;
        const horaInicio = agenda.horaInicio;
        const horaFim = agenda.horaFim;

        const verificaAgenda = await this.repository.findOne({
          where: { medicoId, data, horaInicio, horaFim},
        });
    
        if (!verificaAgenda) {
          return this.repository.save(agenda);
        }
        throw new Error('Horario já criado');
      }
      buscaAgendaDoMedico(medicoId: string): Promise<AgendaEntity[]> {
        return this.repository.find({ where: { medicoId } });
      }
    
      async buscarAgendamentoPorId(id: string): Promise<AgendaEntity> {
        return this.repository.findOne({where: { id: id },});
      }
    
      async atualizar(id: string, agenda: AgendaDTO): Promise<void> {
        await this.repository.update(id, agenda);
      }
    
      async apagar(id: string): Promise<void> {
        await this.repository.delete(id);
      }
    
      async atualizarStatusAgendamento(id: string, status: boolean): Promise<void> {
        await this.repository.update(id, { agendaFechada: status });
      }

}