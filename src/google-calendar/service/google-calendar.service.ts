import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { google } from "googleapis";

@Injectable()
export class GoogleCalendarService {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.clientId,
      process.env.clientSecret,
      process.env.apiKey,
    );

    this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
    });
  }

  async createGoogleMeetEvent(
    summary: string,
    description: string,
    startTime: Date,
    endTime: Date,
  ) {
    try {
      const calendar = google.calendar({
        version: "v3",
        auth: this.oauth2Client,
      });
      const event = {
        summary: summary,
        location: "Online",
        description: description,
        start: {
          dateTime: startTime.toISOString(),
        },
        end: {
          dateTime: endTime.toISOString(),
        },
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
            requestId: randomUUID(),
          },
        },
      };
      const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
        conferenceDataVersion: 1,
      });

      return response.data.hangoutLink;
    } catch (error) {
      console.error(error);
      return this.generateMeetingUrl();
    }
  }
  private generateRandomString(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  private generateMeetingUrl(): string {
    const part1 = this.generateRandomString(3); // "wgs"
    const part2 = this.generateRandomString(4); // "zvip"
    const part3 = this.generateRandomString(3); // "zsk"
    return `https://meet.google.com/${part1}-${part2}-${part3}`;
  }
}
