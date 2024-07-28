import { MedicoModel } from "src/medicos/model/medico.model";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("horarios_disponiveis")
export class HorarioDisponivelModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "medico_id" })
  medicoId: string;

  @ManyToOne(() => MedicoModel, (medico) => medico.horariosDisponiveis)
  medico: MedicoModel;

  @Column()
  data: string; // Ex: 'YYYY-MM-DD'

  @Column({ name: "hora_inicio" })
  horaInicio: string; // Ex: '08:00'

  @Column({ name: "hora_fim" })
  horaFim: string; // Ex: '12:00'
}
