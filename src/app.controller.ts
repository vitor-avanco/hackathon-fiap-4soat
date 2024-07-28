import { Controller, Get } from "@nestjs/common";
import { GoogleCalendarService } from "./google-calendar/service/google-calendar.service";

@Controller()
export class AppController {
  constructor(private googleCalendarService: GoogleCalendarService) {}
  @Get()
  getHello(): string {
    this.googleCalendarService.createGoogleMeetEvent(
      "teste",
      "teste teste",
      new Date(),
      new Date(),
    );
    return "Ok";
  }
}
