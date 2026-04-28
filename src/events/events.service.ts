import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async logReset(session_uuid: string): Promise<void> {
    try {
      await this.prisma.resetEvent.create({ data: { session_uuid } });
    } catch (err) {
      this.logger.error('Failed to log reset event', err);
    }
  }

  async logShare(session_uuid: string): Promise<void> {
    try {
      await Promise.all([
        this.prisma.shareEvent.create({ data: { session_uuid } }),
        this.prisma.session.updateMany({
          where: { session_uuid },
          data: { clicked_share: true },
        }),
      ]);
    } catch (err) {
      this.logger.error('Failed to log share event', err);
    }
  }
}
