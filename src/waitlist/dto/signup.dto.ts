import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsIn(['summary_screen'])
  source: string;

  @IsOptional()
  @IsString()
  hp?: string;
}
