import {
  IsString,
  IsIn,
  IsArray,
  IsInt,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import type { Subject, Difficulty } from '../../types/domain';

export class QuestionDto {
  @IsString()
  id!: string;

  @IsIn(['maths', 'english', 'economics'])
  subject!: Subject;

  @IsString()
  topic!: string;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty!: Difficulty;

  @IsString()
  question_text!: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsString({ each: true })
  options!: string[];

  @IsInt()
  @Min(0)
  @Max(3)
  correct_index!: number;

  @IsString()
  source!: string;
}
