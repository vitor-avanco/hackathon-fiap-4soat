import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProntuarioModel } from "../model/prontuario.model";
import { ProntuarioDTO } from "../dto/prontuario.dto";
import { DocumentoModel } from "src/documentos/model/documentos.model";

@Injectable()
export class ProntuariosService {
  constructor(
    @InjectRepository(ProntuarioModel)
    private readonly prontuarioRepository: Repository<ProntuarioModel>,
    @InjectRepository(DocumentoModel)
    private readonly documentoRepository: Repository<DocumentoModel>,
  ) {}

  async create(createProntuarioDto: ProntuarioDTO): Promise<ProntuarioModel> {
    const prontuario = this.prontuarioRepository.create(createProntuarioDto);
    return await this.prontuarioRepository.save(prontuario);
  }

  async findAll(): Promise<ProntuarioModel[]> {
    return this.prontuarioRepository.find({ relations: ["documentos"] });
  }

  async findOne(id: string): Promise<ProntuarioModel> {
    const prontuario = this.prontuarioRepository.findOne({
      where: { id: id },
      relations: ["documentos"],
    });

    if (!prontuario) {
      throw new NotFoundException(`Prontuário com ID ${id} não encontrado`);
    }
    return prontuario;
  }

  async update(
    id: string,
    prontuarioDTO: ProntuarioDTO,
  ): Promise<ProntuarioModel> {
    const prontuario = await this.prontuarioRepository.findOne({
      where: { id: id },
      relations: ["documentos"],
    });

    if (!prontuario) {
      throw new NotFoundException();
    }

    await this.prontuarioRepository.save(
      Object.assign(prontuario, prontuarioDTO),
    );
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.prontuarioRepository.delete(id);
  }
}
