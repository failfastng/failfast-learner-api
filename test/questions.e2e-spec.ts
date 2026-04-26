import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('QuestionsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /questions returns all 45 questions with correct shape', async () => {
    const response = await request(app.getHttpServer())
      .get('/questions')
      .expect(200);

    const body: unknown[] = response.body as unknown[];

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(45);

    const first = body[0] as Record<string, unknown>;
    expect(Object.keys(first)).toEqual(
      expect.arrayContaining([
        'id',
        'subject',
        'topic',
        'difficulty',
        'question_text',
        'options',
        'correct_index',
        'source',
      ]),
    );
    expect(Array.isArray(first.options)).toBe(true);
    expect((first.options as unknown[]).length).toBe(4);
  });
});
