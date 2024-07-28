import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FiltroDTO } from "../dto/medicos.dto";
import { MedicoModel } from "../model/medico.model";

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(MedicoModel)
    private readonly repository: Repository<MedicoModel>,
  ) {}

  async buscarPorId(id: string): Promise<any | null> {
    return await this.repository.findOne({
      where: { id: id },
      relations: ["horariosDisponiveis"],
    });
  }

  async listar(filtros: FiltroDTO): Promise<MedicoModel[] | []> {
    const result = await this.repository.find({
      where: {
        ...filtros,
      },
    });
    return result;
  }
}
