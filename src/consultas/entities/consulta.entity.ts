import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ConsultaStatus } from "../enum/consulta.enum";

@Entity("consulta")
export class ConsultaEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "agenda_id", nullable: false })
  agendaId: string;

  @Column({ name: "paciente_nome", nullable: false })
  pacienteNome: string;

  @Column({ name: "paciente_email", nullable: false })
  pacienteEmail: string;

  @Column({ name: "paciente_documento", nullable: false })
  pacienteDocumento: string;

  @Column({ name: "link_consulta", nullable: true })
  linkConsultaOnline: string;

  @Column({
    type: "enum",
    enum: ConsultaStatus,
  })
  status: ConsultaStatus;

  @CreateDateColumn({ name: "criado_em" })
  createdIn: string;

  @UpdateDateColumn({ name: "atualizado_em" })
  updatedIn: string;
}
