import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { GeoService } from '../geo/geo.service';
import { SessionsService } from './sessions.service';
import { SessionEndDto } from './dto/session-end.dto';

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly geoService: GeoService,
  ) {}

  @Post()
  @HttpCode(200)
  async logEnd(@Body() dto: SessionEndDto, @Req() req: Request): Promise<void> {
    const ip = this.geoService.extractIp(req);
    const country = await this.geoService.lookupCountry(ip);
    await this.sessionsService.logEnd(dto, country);
  }
}
