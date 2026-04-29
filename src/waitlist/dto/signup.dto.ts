import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export const SCHOOL_SIZE_VALUES = [
  'above_50',
  'below_50',
  'not_known',
] as const;

function emptyToUndefined(val: unknown): unknown {
  if (val === '' || val === null) return undefined;
  return val;
}

export class SignupDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  @IsEmail()
  email!: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MinLength(1)
  @MaxLength(512)
  source!: string;

  @Transform(({ value }: { value: unknown }) => emptyToUndefined(value))
  @IsOptional()
  @IsString()
  @MaxLength(512)
  name?: string;

  @Transform(({ value }: { value: unknown }) => emptyToUndefined(value))
  @IsOptional()
  @IsString()
  @MaxLength(10_000)
  message?: string;

  @Transform(({ value }: { value: unknown }) => emptyToUndefined(value))
  @IsOptional()
  @IsIn([...SCHOOL_SIZE_VALUES])
  school_size?: (typeof SCHOOL_SIZE_VALUES)[number];

  @IsOptional()
  @IsUUID()
  session_uuid?: string;

  @IsOptional()
  @IsString()
  hp?: string;
}
