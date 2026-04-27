import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { EventsService } from './events.service';
import { ResetDto } from './dto/reset.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('reset')
  @HttpCode(204)
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  async reset(@Body() dto: ResetDto): Promise<void> {
    await this.eventsService.logReset(dto.session_uuid);
  }
}
