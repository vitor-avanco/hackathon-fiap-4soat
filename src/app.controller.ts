import { Controller, Get } from "@nestjs/common";
import { HealthCheckService, HealthCheck, HealthCheckResult } from "@nestjs/terminus";

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Ok';
  }
}