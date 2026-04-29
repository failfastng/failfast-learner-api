import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Server } from 'http';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Waitlist (e2e)', () => {
  let app: INestApplication<Server>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
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
    await request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'summary_screen' })
      .expect(200);

    await prisma.waitlistSignup.deleteMany({ where: { email } });
  });

  it('POST /waitlist — same email and source merges rows (no overwrite)', async () => {
    const email = `merge-${Date.now()}@example.com`;
    const source = `Merge-${Date.now()}`;

    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        source,
        message: 'first',
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        source,
        message: 'second',
      })
      .expect(200);

    const rows = await prisma.waitlistSignup.findMany({
      where: { email },
    });
    expect(rows.length).toBe(1);
    expect(rows[0].message).toBe('first');

    await prisma.waitlistSignup.deleteMany({ where: { email } });
  });

  it('POST /waitlist — fills missing nullable fields from second submit', async () => {
    const email = `fill-${Date.now()}@example.com`;
    const source = `Fill-${Date.now()}`;

    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        source,
        message: 'only message',
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        source,
        name: 'Ada',
      })
      .expect(200);

    const row = await prisma.waitlistSignup.findUnique({
      where: { email_source: { email, source } },
    });
    expect(row?.message).toBe('only message');
    expect(row?.name).toBe('Ada');

    await prisma.waitlistSignup.deleteMany({ where: { email } });
  });

  it('POST /waitlist — same email different source creates two rows', async () => {
    const email = `two-src-${Date.now()}@example.com`;

    await request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'Source A', message: 'a' })
      .expect(200);
    await request(app.getHttpServer())
      .post('/waitlist')
      .send({ email, source: 'Source B', message: 'b' })
      .expect(200);

    const rows = await prisma.waitlistSignup.findMany({ where: { email } });
    expect(rows.length).toBe(2);

    await prisma.waitlistSignup.deleteMany({ where: { email } });
  });

  it('POST /waitlist — website-shaped payload returns 200', async () => {
    const email = `web-${Date.now()}@example.com`;
    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        name: 'Ada',
        source: 'Homepage Challenger Waitlist',
        message: 'I want in. I signed up as Ada (ada@example.com).',
      })
      .expect(200);

    await prisma.waitlistSignup.deleteMany({ where: { email } });
  });

  it('POST /waitlist — invalid school_size returns 400', async () => {
    return request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email: `bad-school-${Date.now()}@example.com`,
        source: 'For Schools Waitlist',
        school_size: 'invalid',
      })
      .expect(400);
  });

  it('POST /waitlist — honeypot filled returns 200 with no signup row', async () => {
    const email = `bot-row-${Date.now()}@example.com`;
    await request(app.getHttpServer())
      .post('/waitlist')
      .send({
        email,
        source: 'summary_screen',
        hp: 'i-am-a-bot',
      })
      .expect(200);

    const rows = await prisma.waitlistSignup.findMany({ where: { email } });
    expect(rows.length).toBe(0);
  });
});
