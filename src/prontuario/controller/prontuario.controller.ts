import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { ProntuarioDTO } from "../dto/prontuario.dto";
import { ProntuariosService } from "../services/prontuario.service";
import { Authorization } from "@nestjs-cognito/auth";

@Controller("prontuarios")
export class ProntuarioController {
  constructor(private readonly prontuariosService: ProntuariosService) {}

  @Post()
  @Authorization(["doctors"])
  create(@Body() createProntuarioDto: ProntuarioDTO) {
    return this.prontuariosService.create(createProntuarioDto);
  }

  @Get()
  @Authorization(["doctors"])
  findAll() {
    return this.prontuariosService.findAll();
  }

  @Get(":id")
  @Authorization(["doctors"])
  findOne(@Param("id") id: string) {
    return this.prontuariosService.findOne(id);
  }

  @Patch(":id")
  @Authorization(["doctors"])
  update(@Param("id") id: string, @Body() prontuario: ProntuarioDTO) {
    return this.prontuariosService.update(id, prontuario);
  }

  @Delete(":id")
  @Authorization(["doctors"])
  remove(@Param("id") id: string) {
    return this.prontuariosService.remove(id);
  }
}
