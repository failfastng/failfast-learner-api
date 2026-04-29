import { Module } from '@nestjs/common';
import { GeoModule } from '../geo/geo.module';
import { PrismaModule } from '../prisma/prisma.module';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';

@Module({
  imports: [PrismaModule, GeoModule],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
