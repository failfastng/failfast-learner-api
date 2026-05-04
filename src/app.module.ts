import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { SessionsModule } from './sessions/sessions.module';
import { EventsModule } from './events/events.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    QuestionsModule,
    WaitlistModule,
    SessionsModule,
    EventsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
