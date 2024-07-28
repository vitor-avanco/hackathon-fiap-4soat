import { MedicoModel } from "src/medicos/model/medico.model";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ConsultaStatus } from "../enum/consulta.enum";

@Entity("consultas")
export class ConsultaModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => MedicoModel, (medico) => medico.consultas)
  medico: MedicoModel;

  @Column({ name: "paciente_nome", nullable: false })
  pacienteNome: string;

  @Column({ name: "paciente_email", nullable: false })
  pacienteEmail: string;

  @Column({ name: "paciente_documento", nullable: false })
  pacienteDocumento: string;

  @Column()
  data: Date;

  @Column({
    type: "enum",
    enum: ConsultaStatus,
  })
  status: ConsultaStatus;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm: string;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: string;

  @Column()
  linkReuniao: string;
}
