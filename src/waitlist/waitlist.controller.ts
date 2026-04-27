import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { HoneypotGuard } from './guards/honeypot.guard';
import { WaitlistService } from './waitlist.service';
import { SignupDto } from './dto/signup.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(HoneypotGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async signup(@Body() dto: SignupDto, @Req() req: any): Promise<void> {
    if (req.__honeypot_triggered) return;
    await this.waitlistService.signup(dto);
  }
}
