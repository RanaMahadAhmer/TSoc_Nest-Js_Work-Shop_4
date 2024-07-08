import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(2, 20)
  name: string;
  @IsString()
  @Length(2, 20)
  password: string;
  @IsEmail()
  email: string;
}
