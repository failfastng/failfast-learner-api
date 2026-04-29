import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Sessions (e2e)', () => {
  let app: INestApplication<Server>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /sessions — valid SessionEndDto returns 200', async () => {
    const now = new Date().toISOString();
    return request(app.getHttpServer())
      .post('/sessions')
      .send({
        session_uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        display_name_hash: 'abc123hash',
        subject: 'maths',
        started_at: now,
        last_activity_at: now,
        ended_at: now,
        ended_early: false,
        questions_answered: 5,
        questions_abandoned: 1,
        total_points: 100,
        success_points: 80,
        grit_points: 20,
        completed_waitlist_signup: false,
        clicked_share: false,
        outcomes: [
          {
            question_id: 'q-001',
            outcome: 'first_try_correct',
            success_points_earned: 10,
            grit_points_earned: 5,
            resolved_at: now,
          },
        ],
      })
      .expect(200);
  });
});
