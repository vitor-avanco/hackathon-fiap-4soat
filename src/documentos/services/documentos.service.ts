import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDocumentoDto } from "../dto/documentos.dto";
import { DocumentoModel } from "../model/documentos.model";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class DocumentosService {
  private bucketName: string;
  private bucket: string;
  private region = "us-east-1";

  constructor(
    @InjectRepository(DocumentoModel)
    private readonly documentoRepository: Repository<DocumentoModel>,
  ) {
    this.bucketName = "documentos-pacientes-fiap-soat4";
    this.bucket =
      "https://documentos-pacientes-fiap-soat4.s3.us-east-1.amazonaws.com";
  }

  async create(
    createDocumentoDto: CreateDocumentoDto,
    sub: string,
    fileBuffer: Buffer,
    fileName: string,
  ): Promise<DocumentoModel> {
    try {
      this.uploadFile(sub, fileBuffer, fileName);

      const fileUrl = await this.share(fileName, sub);
      if (!fileUrl)
        throw new InternalServerErrorException(
          "Erro ao enviar o seu documento, tente novamente mais tarde.",
        );

      createDocumentoDto.urlArquivo = fileUrl;

      const documento = this.documentoRepository.create(createDocumentoDto);
      return this.documentoRepository.save(documento);
    } catch (err) {
      throw new BadRequestException(
        "Erro ao enviar o seu documento, tente novamente mais tarde.",
      );
    }
  }

  findOne(id: string): Promise<DocumentoModel> {
    return this.documentoRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.documentoRepository.delete(id);
  }

  async uploadFile(
    sub: string,
    fileBuffer: Buffer,
    fileOriginalName: string,
  ): Promise<any> {
    const client = new S3Client({
      region: this.region,
      endpoint: this.bucket,
      forcePathStyle: true,
    });

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${sub}/${fileOriginalName}`,
      Body: fileBuffer,
    });

    try {
      return await client.send(command);
    } catch (err) {
      console.error(err);
    }
  }
  private async share(key: string, sub: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: `${sub}/${key}`,
    });

    const client = new S3Client({
      region: this.region,
      endpoint: this.bucket,
      forcePathStyle: true,
    });

    try {
      let url: string;
      const response = await client.send(command);
      if (response) {
        url = await getSignedUrl(client, command, { expiresIn: 3600 });
      }
      return url;
    } catch (err) {
      console.error(err);
    }
  }
}
