import { IsUUID } from 'class-validator';

export class ResetDto {
  @IsUUID()
  session_uuid: string;
}
