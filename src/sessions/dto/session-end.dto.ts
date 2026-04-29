import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionOutcomeDto } from './question-outcome.dto';

export class SessionEndDto {
  @IsUUID()
  session_uuid!: string;

  @IsString()
  display_name_hash!: string;

  @IsIn(['maths', 'english', 'economics'])
  subject!: string;

  @IsDateString()
  started_at!: string;

  @IsDateString()
  last_activity_at!: string;

  @IsDateString()
  ended_at!: string;

  @IsBoolean()
  ended_early!: boolean;

  @IsInt()
  @Min(0)
  questions_answered!: number;

  @IsInt()
  @Min(0)
  questions_abandoned!: number;

  @IsInt()
  @Min(0)
  total_points!: number;

  @IsInt()
  @Min(0)
  success_points!: number;

  @IsInt()
  @Min(0)
  grit_points!: number;

  @IsBoolean()
  completed_waitlist_signup!: boolean;

  @IsBoolean()
  clicked_share!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOutcomeDto)
  outcomes!: QuestionOutcomeDto[];
}
