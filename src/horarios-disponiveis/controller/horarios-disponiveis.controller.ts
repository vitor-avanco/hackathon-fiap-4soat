import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { CreateHorarioDisponivelDto } from "../dto/create-horario-disponivel.dto";
import { UpdateHorarioDisponivelDto } from "../dto/update-horario-disponivel.dto";
import { HorariosDisponiveisService } from "../services/horarios-disponiveis.service";
import { Authorization } from "@nestjs-cognito/auth";

@Controller("horarios_disponiveis")
export class HorariosDisponiveisController {
  constructor(
    private readonly horariosDisponiveisService: HorariosDisponiveisService,
  ) {}

  @Post()
  @Authorization(["doctors"])
  create(@Body() createHorarioDisponivelDto: CreateHorarioDisponivelDto) {
    return this.horariosDisponiveisService.create(createHorarioDisponivelDto);
  }

  @Get()
  findAll() {
    return this.horariosDisponiveisService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.horariosDisponiveisService.findOne(id);
  }

  @Put(":id")
  @Authorization(["doctors"])
  update(
    @Param("id") id: string,
    @Body() updateHorarioDisponivelDto: UpdateHorarioDisponivelDto,
  ) {
    return this.horariosDisponiveisService.update(
      id,
      updateHorarioDisponivelDto,
    );
  }

  @Delete(":id")
  @Authorization(["doctors"])
  remove(@Param("id") id: string) {
    return this.horariosDisponiveisService.remove(id);
  }
}
