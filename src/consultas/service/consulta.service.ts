import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConsultaModel } from "../model/consulta.model";
import { GoogleCalendarService } from "src/google-calendar/service/google-calendar.service";
import { HorariosDisponiveisService } from "src/horarios-disponiveis/services/horarios-disponiveis.service";
import { ConsultaDTO, UpdateConsultaDTO } from "../dto/consulta.dto";

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(ConsultaModel)
    private readonly consultaRepository: Repository<ConsultaModel>,
    private readonly googleCalendarService: GoogleCalendarService,
    private readonly horariosDisponiveisService: HorariosDisponiveisService,
  ) {}

  async create(createConsultaDto: ConsultaDTO): Promise<ConsultaModel> {
    const { medicoId, data } = createConsultaDto;

    const isDisponivel =
      await this.horariosDisponiveisService.isHorarioDisponivel(medicoId, data);
    if (!isDisponivel) {
      throw new BadRequestException("Horário não disponível para este médico.");
    }

    const urlHangout = await this.googleCalendarService.createGoogleMeetEvent(
      "Consulta Médica",
      "Consulta entre paciente e médico",
      new Date(data),
      new Date(new Date(data).getTime() + 50 * 60 * 1000), // 50 minutos de duração
    );

    const consulta = this.consultaRepository.create({
      medico: { id: medicoId },
      pacienteNome: createConsultaDto.pacienteNome,
      pacienteEmail: createConsultaDto.pacienteEmail,
      pacienteDocumento: createConsultaDto.pacienteDocumento,
      data,
      status: createConsultaDto.status,
      linkReuniao: urlHangout,
    });

    return await this.consultaRepository.save(consulta);
  }

  async findAll(): Promise<ConsultaModel[]> {
    return await this.consultaRepository.find();
  }

  async findOne(id: string): Promise<ConsultaModel> {
    const response = await this.consultaRepository.findOne({
      where: { id: id },
    });
    if (!response) {
      throw new NotFoundException("Consulta não encontrada.");
    }
    return response;
  }

  async update(
    id: string,
    updateConsultaDto: UpdateConsultaDTO,
  ): Promise<ConsultaModel> {
    await this.consultaRepository.update(id, updateConsultaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.consultaRepository.delete(id);
  }
}
