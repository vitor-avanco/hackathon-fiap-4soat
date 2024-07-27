import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AgendaDTO {
  
  @IsString()
  id?: string;

  @IsString()
  @IsOptional()
  medicoId?: string;

  @IsString()
  data?: string;

  @IsString()
  horaInicio?: string;

  @IsString()
  horaFim?: string;

  agendaFechada?: boolean;
}
