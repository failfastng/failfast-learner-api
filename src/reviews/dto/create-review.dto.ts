import { IsIn, IsString, IsUUID, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @IsUUID()
  session_uuid!: string;

  @IsString()
  @MaxLength(2000)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  text!: string;

  @IsIn(['summary', 'returning_start'])
  source!: string;
}
