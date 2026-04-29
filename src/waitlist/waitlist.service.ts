import { Injectable } from '@nestjs/common';
import { Prisma, type WaitlistSignup } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';

function isFilled(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/* If the IDE flags Prisma delegates on `PrismaService`, run `npx prisma generate` and reload the TS server (types match `npm run build`). */
@Injectable()
export class WaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupDto): Promise<void> {
    const email = dto.email.toLowerCase().trim();
    const source = dto.source.trim();

    const incomingName = dto.name?.trim();
    const incomingMessage = dto.message?.trim();
    const incomingSchoolSize = dto.school_size ?? undefined;
    const incomingSessionUuid = dto.session_uuid ?? undefined;

    let existing: WaitlistSignup | null =
      await this.prisma.waitlistSignup.findUnique({
        where: {
          email_source: {
            email,
            source,
          },
        },
      });

    const applyMerge = async (): Promise<void> => {
      if (!existing) return;
      const patch: {
        name?: string;
        message?: string;
        school_size?: string;
        session_uuid?: string;
      } = {};

      if (!isFilled(existing.name) && incomingName) patch.name = incomingName;
      if (!isFilled(existing.message) && incomingMessage)
        patch.message = incomingMessage;
      if (!isFilled(existing.school_size) && incomingSchoolSize)
        patch.school_size = incomingSchoolSize;
      if (!isFilled(existing.session_uuid) && incomingSessionUuid)
        patch.session_uuid = incomingSessionUuid;

      if (Object.keys(patch).length > 0) {
        await this.prisma.waitlistSignup.update({
          where: {
            email_source: {
              email,
              source,
            },
          },
          data: patch,
        });
      }
    };

    if (!existing) {
      const createData: Prisma.WaitlistSignupCreateInput = {
        email,
        source,
        name: incomingName,
        message: incomingMessage,
        school_size: incomingSchoolSize,
        session_uuid: incomingSessionUuid,
      };
      try {
        await this.prisma.waitlistSignup.create({ data: createData });
      } catch (err: unknown) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          existing = await this.prisma.waitlistSignup.findUnique({
            where: {
              email_source: {
                email,
                source,
              },
            },
          });
          await applyMerge();
        } else {
          throw err;
        }
      }
    } else {
      await applyMerge();
    }

    if (dto.session_uuid) {
      await this.prisma.session.updateMany({
        where: { session_uuid: dto.session_uuid },
        data: { completed_waitlist_signup: true },
      });
    }
  }
}
