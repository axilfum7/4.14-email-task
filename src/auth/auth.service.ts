import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || Role.USER, 
      },
    });

    const token = this.generateJwt(user.id, user.role);

    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateJwt(user.id, user.role);

    return { token };
  }

  private generateJwt(userId: number, role: Role) {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}