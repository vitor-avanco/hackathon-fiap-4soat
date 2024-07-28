import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateHorarioDisponivelDto {
  @IsInt()
  @IsNotEmpty()
  medicoId: string;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFim: string;
}
