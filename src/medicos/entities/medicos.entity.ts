import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('medicos')
export class MedicoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', nullable: false })
  nome: string;

  @Column({ name: 'crm', length: 9, nullable: false, unique: true })
  crm: string;

  @Column({ name: 'especialidade', nullable: false })
  especialidade: string;

  @Column({ name: 'avaliacao', nullable: false })
  avaliacao: number;

  @Column({ name: 'distancia', nullable: false })
  distancia: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: string;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: string;

  @DeleteDateColumn({ name: 'deletado_em' })
  deletadoEm: string;

  @Column({ name: 'status', nullable: false, default: true })
  ativo: boolean;
}
