import { DocumentoModel } from "src/documentos/model/documentos.model";

export class ProntuarioDTO {
  id?: string;
  pacienteDocumento?: string;
  medicoId?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
  documentos?: DocumentoModel[];
}
