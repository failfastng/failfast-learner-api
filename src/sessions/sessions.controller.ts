import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionEndDto } from './dto/session-end.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200)
  async logEnd(@Body() dto: SessionEndDto): Promise<void> {
    await this.sessionsService.logEnd(dto);
  }
}
