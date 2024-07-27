import {
    Controller,
    Inject,
    Get,
    Param,
    NotFoundException,
    Query,
  } from '@nestjs/common';
import { MedicosModel } from '../model/medicos.model';
import { FiltroDTO } from '../dto/medicos.dto';
import { MedicoEntity } from '../entities/medicos.entity';

@Controller('medicos')
export class MedicosController {
    constructor(
        @Inject(MedicosModel)
        private readonly medicos: MedicosModel
    ) {}

    @Get('/:id')
    async buscarPorId(@Param('id') id: string) {
        try {
            return await this.medicos.buscarPorId(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get()
    async listar(
            @Query()filtros: FiltroDTO,
        ): Promise<MedicoEntity[] | []> {
        try {
          return await this.medicos.listar(filtros);
        } catch (e) {
          throw new Error(e);
        }
      }
}
