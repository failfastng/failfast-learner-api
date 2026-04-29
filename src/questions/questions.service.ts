import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { QuestionDto } from './dto/question.dto';
import { Question } from '../types/domain';

@Injectable()
export class QuestionsService implements OnModuleInit {
  private readonly questions: Question[] = [];

  onModuleInit(): void {
    const seedPath = path.resolve(__dirname, 'seed', 'questions.json');
    let raw: unknown[];

    try {
      const content = fs.readFileSync(seedPath, 'utf-8');
      raw = JSON.parse(content) as unknown[];
    } catch (err: unknown) {
      throw new Error(
        `QuestionsService: failed to read seed file at ${seedPath} — ${String(err)}`,
      );
    }

    for (const entry of raw) {
      const dto = plainToInstance(QuestionDto, entry);
      const errors = validateSync(dto);
      if (errors.length > 0) {
        const idRaw = (entry as Record<string, unknown>)?.id;
        const id =
          typeof idRaw === 'string' || typeof idRaw === 'number'
            ? String(idRaw)
            : '<unknown>';
        const fields = errors
          .map(
            (e) =>
              `${e.property}: ${Object.values(e.constraints ?? {}).join(', ')}`,
          )
          .join('; ');
        throw new Error(
          `QuestionsService: validation failed for question id="${id}" — ${fields}`,
        );
      }
      this.questions.push(dto);
    }
  }

  findAll(): Question[] {
    return this.questions;
  }
}
