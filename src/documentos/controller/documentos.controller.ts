import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { DocumentosService } from "../services/documentos.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Authorization, CognitoUser } from "@nestjs-cognito/auth";

@Controller("documentos")
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  @Authorization(["customers"])
  @UseInterceptors(FileInterceptor("file"))
  create(
    @CognitoUser("sub") sub: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.documentosService.create(
      {
        ...body,
      },
      sub,
      file.buffer,
      file.originalname,
    );
  }

  @Post("upload")
  @Authorization(["customers"])
  @UseInterceptors(FileInterceptor("file"))
  upload(
    @CognitoUser("sub") sub: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentosService.uploadFile(
      sub,
      file.buffer,
      file.originalname,
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentosService.findOne(id);
  }

  @Authorization(["customers"])
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentosService.remove(id);
  }
}
