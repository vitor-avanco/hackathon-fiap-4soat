import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicoEntity } from "../entities/medicos.entity";
import { FiltroDTO } from "../dto/medicos.dto";

@Injectable()
export class MedicosModel {
    constructor(
        @InjectRepository(MedicoEntity)
        private readonly repository: Repository<MedicoEntity>,
    ) {}


    async buscarPorId(id: string): Promise<any | null> {
        return await this.repository.findOne({where: { id: id }});
    }

    async listar(
        filtros: FiltroDTO,
    ): Promise<MedicoEntity[] | []> {
        const result = await this.repository.find({
            where: { 
            ativo: true, 
            ...filtros
            },
        });
        return result;
    }
}