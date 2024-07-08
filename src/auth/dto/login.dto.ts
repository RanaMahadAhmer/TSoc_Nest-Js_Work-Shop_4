import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @Length(2, 20)
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
