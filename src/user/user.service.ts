import { Injectable } from '@nestjs/common';
import { PrismaService } from '../generated/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
