import { Controller, Post, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from '../auth/role.enum';
import { ParseIntPipe } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard)
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsService.getProducts(paginationDto);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Post(':id/update')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, dto);
  }

  @Post(':id/delete')
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}