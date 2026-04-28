import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class WaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupDto): Promise<void> {
    const email = dto.email.toLowerCase().trim();
    try {
      await this.prisma.waitlistSignup.create({
        data: { email, source: dto.source },
      });
    } catch (err: unknown) {
      if ((err as { code?: string })?.code !== 'P2002') throw err;
      // duplicate email — fall through so the session row still gets updated
    }
    if (dto.session_uuid) {
      await this.prisma.session.updateMany({
        where: { session_uuid: dto.session_uuid },
        data: { completed_waitlist_signup: true },
      });
    }
  }
}
