import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @Length(2, 20)
  name: string;
  @ApiProperty()
  @IsString()
  @Length(2, 20)
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
