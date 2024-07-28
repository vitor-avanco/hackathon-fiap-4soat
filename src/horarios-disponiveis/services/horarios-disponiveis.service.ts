import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHorarioDisponivelDto } from "../dto/create-horario-disponivel.dto";
import { UpdateHorarioDisponivelDto } from "../dto/update-horario-disponivel.dto";
import { HorarioDisponivelModel } from "../model/horario-disponivel.model";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

@Injectable()
export class HorariosDisponiveisService {
  constructor(
    @InjectRepository(HorarioDisponivelModel)
    private readonly horarioDisponivelRepository: Repository<HorarioDisponivelModel>,
  ) {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("America/Sao_Paulo");
  }

  async create(
    createHorarioDisponivelDto: CreateHorarioDisponivelDto,
  ): Promise<HorarioDisponivelModel> {
    const horario = this.horarioDisponivelRepository.create(
      createHorarioDisponivelDto,
    );
    return await this.horarioDisponivelRepository.save(horario);
  }

  async findAll(): Promise<HorarioDisponivelModel[]> {
    return await this.horarioDisponivelRepository.find();
  }

  async findOne(id: string): Promise<HorarioDisponivelModel> {
    return await this.horarioDisponivelRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateHorarioDisponivelDto: UpdateHorarioDisponivelDto,
  ): Promise<HorarioDisponivelModel> {
    await this.horarioDisponivelRepository.update(
      id,
      updateHorarioDisponivelDto,
    );
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.horarioDisponivelRepository.delete(id);
  }

  async isHorarioDisponivel(
    medicoId: string,
    dataConsulta: Date,
  ): Promise<boolean> {
    const data = dayjs(dataConsulta)
      .tz("America/Sao_Paulo")
      .format("YYYY-MM-DD");
    const horaInicio = dayjs(dataConsulta)
      .tz("America/Sao_Paulo")
      .format("HH:mm:ss");
    const horaFim = dayjs(dataConsulta)
      .add(50, "minute")
      .tz("America/Sao_Paulo")
      .format("HH:mm:ss");

    const horarios = await this.horarioDisponivelRepository.find({
      where: { medicoId, data },
    });

    return horarios.some((horario) => {
      return horaInicio >= horario.horaInicio && horaFim <= horario.horaFim;
    });
  }
}
