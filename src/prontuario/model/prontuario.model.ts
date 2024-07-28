import { DocumentoModel } from "src/documentos/model/documentos.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from "typeorm";

@Entity("prontuario")
export class ProntuarioModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "paciente_documento", nullable: false })
  pacienteDocumento: string;

  @Column({ name: "medico_id", nullable: false })
  medicoId: string;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm: Date;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: Date;

  @OneToMany(() => DocumentoModel, (documento) => documento.prontuario)
  documentos: DocumentoModel[];
}
