import { IsUUID } from 'class-validator';

export class ShareDto {
  @IsUUID()
  session_uuid!: string;
}
