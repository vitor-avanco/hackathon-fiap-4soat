import { IsString } from "class-validator";
import { ConsultaStatus } from "../enum/consulta.enum";

export class ConsultaDTO {
    @IsString()
    id: string;

    @IsString()
    agendaId: string;

    @IsString()
    pacienteNome: string;

    @IsString()
    pacienteDocumento: string;

    @IsString()
    pacienteEmail: string;

    status: ConsultaStatus;

    linkConsultaOnline: string;
}