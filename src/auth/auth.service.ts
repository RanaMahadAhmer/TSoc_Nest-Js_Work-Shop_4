import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.databaseService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('No user exists with this email');
    }
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new NotFoundException('Password is incorrect');
    }
    return { token: this.jwtService.sign({ email }) };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.databaseService.user.findFirst({
      where: {
        email: registerDto.email,
      },
    });
    if (user) {
      throw new BadGatewayException('User already exists');
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const res = await this.databaseService.user.create({ data: registerDto });
    return res;
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  //
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
