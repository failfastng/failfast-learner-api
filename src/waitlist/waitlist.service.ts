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
      if ((err as { code?: string })?.code === 'P2002') return; // duplicate — silent swallow
      throw err;
    }
  }
}
