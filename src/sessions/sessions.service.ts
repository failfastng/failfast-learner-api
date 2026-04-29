import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SessionEndDto } from './dto/session-end.dto';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async logEnd(
    dto: SessionEndDto,
    country: string | null = null,
  ): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.session.create({
          data: {
            session_uuid: dto.session_uuid,
            display_name_hash: dto.display_name_hash,
            subject: dto.subject,
            started_at: new Date(dto.started_at),
            last_activity_at: new Date(dto.last_activity_at),
            ended_at: new Date(dto.ended_at),
            ended_early: dto.ended_early,
            questions_answered: dto.questions_answered,
            questions_abandoned: dto.questions_abandoned,
            total_points: dto.total_points,
            success_points: dto.success_points,
            grit_points: dto.grit_points,
            completed_waitlist_signup: dto.completed_waitlist_signup,
            clicked_share: dto.clicked_share,
            country,
          },
        });
        if (dto.outcomes.length > 0) {
          await tx.questionOutcome.createMany({
            data: dto.outcomes.map((o) => ({
              session_uuid: dto.session_uuid,
              question_id: o.question_id,
              outcome: o.outcome,
              success_points_earned: o.success_points_earned,
              grit_points_earned: o.grit_points_earned,
              resolved_at: new Date(o.resolved_at),
            })),
          });
        }
      });
    } catch (err: unknown) {
      this.logger.error('Failed to log session end', err);
      // swallow — client is fire-and-forget
    }
  }
}
