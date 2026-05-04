import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @HttpCode(204)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async create(@Body() dto: CreateReviewDto): Promise<void> {
    await this.reviewsService.create(dto);
  }
}
