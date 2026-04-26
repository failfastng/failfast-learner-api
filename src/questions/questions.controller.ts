import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../types/domain';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(): Question[] {
    return this.questionsService.findAll();
  }
}
