import { DocumentosTipoEnum } from "../enum/documentos.enum";

// create-documento.dto.ts
export class CreateDocumentoDto {
  prontuarioId?: string;
  tipoDocumento?: DocumentosTipoEnum;
  urlArquivo?: string;
  dataExpiracao?: Date;
  acessoMedicoId?: string;
}

// update-documento.dto.ts
export class UpdateDocumentoDto {
  tipoDocumento?: DocumentosTipoEnum;
  urlArquivo?: string;
  dataExpiracao?: Date;
  acessoMedicoId?: string;
}
