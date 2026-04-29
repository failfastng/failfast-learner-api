import { Module } from '@nestjs/common';
import { GeoModule } from '../geo/geo.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [PrismaModule, GeoModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
