import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('agenda')
export class AgendaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  medicoId: string;

  @Column()
  data: string;

  @Column()
  horaInicio: string;

  @Column()
  horaFim: string;

  @Column({ name: 'reservado', nullable: false, default: false })
  agendaFechada: boolean;

  @CreateDateColumn({ name: 'created_in' })
  createdIn: string;

  @UpdateDateColumn({ name: 'updated_in' })
  updatedIn: string;

  @DeleteDateColumn({ name: 'deleted_in' })
  deletedIn: string;
}
