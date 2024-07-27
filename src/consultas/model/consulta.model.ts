import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConsultaEntity } from "../entities/consulta.entity";
import { ConsultaDTO } from "../dto/consulta.dto";
import { ConsultaStatus } from "../enum/consulta.enum";
import { AgendaEntity } from "src/agenda/entities/agenda.entity";
import { AgendaModel } from "src/agenda/model/agenda.model";
import { ConsultalHeper } from "../helper/consulta.helper";

@Injectable()
export class ConsultaModel {
    constructor(
        private agenda: AgendaModel,
        @InjectRepository(ConsultaEntity)
        private readonly consulta: Repository<ConsultaEntity>,
    ) {}

    async salvar(consulta: ConsultaDTO): Promise<ConsultaDTO> {

        const agendaMedico = await this.agenda.buscarAgendamentoPorId(consulta.agendaId);
        if(agendaMedico.agendaFechada){
            throw new Error('Horario ja reservado');
        }

        // implementar agendamento
        consulta.linkConsultaOnline = ConsultalHeper.generateMeetingUrl();

        const response = this.consulta.create(consulta);
        await this.consulta.save(response);
        await this.agenda.atualizarStatusAgendamento(consulta.agendaId, true);
        return response;
    }

    async alterarStatus(id: string, status: ConsultaStatus): Promise<void> {
        await this.consulta.update(id, { status });
    }

    async buscarConsultaPorId(idConsulta: string): Promise<any> {
        const consulta = await this.consulta.findOne({
            where: { id: idConsulta },
          });
        
        if(!consulta){
            throw new Error('Consulta nao encontrada'); 
        }
        const idAgenda = consulta.agendaId;
        const agenda = await this.agenda.buscarAgendamentoPorId(idAgenda);

        return {...consulta, ...agenda};
    }

}