// user.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  password: string;
}
