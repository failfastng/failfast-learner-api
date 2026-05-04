import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<void> {
    try {
      await this.prisma.review.create({ data: dto });
    } catch (err: unknown) {
      this.logger.error('Failed to save review', err);
    }
  }
}
