import { IsDateString, IsIn, IsInt, IsString, Min } from 'class-validator';

export class QuestionOutcomeDto {
  @IsString()
  question_id: string;

  @IsIn([
    'first_try_correct',
    'second_try_correct',
    'third_try_correct',
    'failed_through',
    'abandoned',
  ])
  outcome: string;

  @IsInt()
  @Min(0)
  success_points_earned: number;

  @IsInt()
  @Min(0)
  grit_points_earned: number;

  @IsDateString()
  resolved_at: string;
}
