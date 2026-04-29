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

export class QuestionDto {
  @IsString()
  id!: string;

  @IsIn(['maths', 'english', 'economics'])
  subject!: string;

  @IsString()
  topic!: string;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty!: string;

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
