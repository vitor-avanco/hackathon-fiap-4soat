import { MedicoModel } from "src/medicos/model/medico.model";
import { ProntuarioModel } from "src/prontuario/model/prontuario.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { DocumentosTipoEnum } from "../enum/documentos.enum";

@Entity("documentos")
export class DocumentoModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ProntuarioModel, (prontuario) => prontuario.documentos)
  prontuario: ProntuarioModel;

  @Column({ name: "tipo_documento" })
  tipoDocumento: DocumentosTipoEnum;

  @Column({ name: "url_arquivo", nullable: true })
  urlArquivo: string;

  @CreateDateColumn({ name: "data_upload" })
  dataUpload: Date;

  @Column({ name: "data_expiracao", nullable: true })
  dataExpiracao: Date;

  @ManyToOne(() => MedicoModel, (medico) => medico.documentosAcessados, {
    nullable: true,
  })
  acessoMedico: MedicoModel;
}
