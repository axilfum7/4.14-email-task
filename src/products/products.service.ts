import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        userId: dto.userId,
      },
    });
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}