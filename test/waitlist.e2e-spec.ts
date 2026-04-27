import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Waitlist (e2e)', () => {
  let app: INestApplication;

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

  it('POST /waitlist — fresh email returns 200', async () => {
    const email = `test-${Date.now()}@example.com`;
    return request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'summary_screen' })
      .expect(200);
  });

  it('POST /waitlist — duplicate email returns 200 silently', async () => {
    const email = `dup-${Date.now()}@example.com`;
    await request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'summary_screen' });
    return request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'summary_screen' })
      .expect(200);
  });

  it('POST /waitlist — honeypot filled returns 200 with no error', async () => {
    return request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email: `bot-${Date.now()}@example.com`,
        source: 'summary_screen',
        hp: 'i-am-a-bot',
      })
      .expect(200);
  });
});
