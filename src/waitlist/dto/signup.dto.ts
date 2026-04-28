import { IsEmail, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsIn(['summary_screen'])
  source: string;

  @IsOptional()
  @IsUUID()
  session_uuid?: string;

  @IsOptional()
  @IsString()
  hp?: string;
}
