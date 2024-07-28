import { PartialType } from "@nestjs/mapped-types";
import { CreateHorarioDisponivelDto } from "./create-horario-disponivel.dto";

export class UpdateHorarioDisponivelDto extends PartialType(
  CreateHorarioDisponivelDto,
) {}
