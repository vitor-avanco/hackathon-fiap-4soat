import { ConsultaModel } from "src/consultas/model/consulta.model";
import { DocumentoModel } from "src/documentos/model/documentos.model";
import { HorarioDisponivelModel } from "src/horarios-disponiveis/model/horario-disponivel.model";
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("medicos")
export class MedicoModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "nome", nullable: false })
  nome: string;

  @Column({ name: "crm", length: 9, nullable: false, unique: true })
  crm: string;

  @Column({ name: "especialidade", nullable: false })
  especialidade: string;

  @Column({ name: "preco", nullable: false })
  preco: number;

  @Column({ name: "avaliacao", nullable: false })
  avaliacao: number;

  @Column({ name: "distancia", nullable: false })
  distancia: number;

  @OneToMany(() => HorarioDisponivelModel, (horario) => horario.medico)
  horariosDisponiveis: HorarioDisponivelModel[];

  @OneToMany(() => ConsultaModel, (consulta) => consulta.medico)
  consultas: ConsultaModel[];

  @OneToMany(() => DocumentoModel, (documento) => documento.acessoMedico)
  documentosAcessados: DocumentoModel[];

  @CreateDateColumn({ name: "criado_em" })
  criadoEm: string;

  @UpdateDateColumn({ name: "atualizado_em" })
  atualizadoEm: string;

  @DeleteDateColumn({ name: "deletado_em" })
  deletadoEm: string;
}
