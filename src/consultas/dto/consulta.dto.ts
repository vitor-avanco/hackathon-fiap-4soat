import { ConsultaStatus } from "../enum/consulta.enum";

export class ConsultaDTO {
  id?: string;
  medicoId: string;
  pacienteNome: string;
  pacienteDocumento: string;
  pacienteEmail: string;
  data: Date;
  status: ConsultaStatus;
  linkReuniao?: string;
  justificativaCancelamento?: string;
}

export class UpdateConsultaDTO {
  status?: ConsultaStatus;
  linkReuniao?: string;
  justificativaCancelamento?: string;
}
