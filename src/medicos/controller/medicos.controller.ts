import {
  Controller,
  Inject,
  Get,
  Param,
  NotFoundException,
  Query,
} from "@nestjs/common";
import { MedicosService } from "../services/medicos.services";
import { FiltroDTO } from "../dto/medicos.dto";
import { MedicoModel } from "../model/medico.model";

@Controller("medicos")
export class MedicosController {
  constructor(
    @Inject(MedicosService)
    private readonly medicos: MedicosService,
  ) {}

  @Get("/:id")
  async buscarPorId(@Param("id") id: string) {
    try {
      return await this.medicos.buscarPorId(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async listar(@Query() filtros: FiltroDTO): Promise<MedicoModel[] | []> {
    try {
      return await this.medicos.listar(filtros);
    } catch (e) {
      throw new Error(e);
    }
  }
}
