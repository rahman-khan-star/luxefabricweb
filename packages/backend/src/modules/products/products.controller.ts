import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  findAll(@Query() filters: ProductFilterDto) {
    return this.productsService.findAll(filters);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get new arrivals' })
  findNewArrivals() {
    return this.productsService.findNewArrivals();
  }

  @Get('best-sellers')
  @ApiOperation({ summary: 'Get best sellers' })
  findBestSellers() {
    return this.productsService.findBestSellers();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related products' })
  getRelated(
    @Param('id') id: string,
    @Query('categoryId') categoryId: string,
  ) {
    return this.productsService.getRelated(id, categoryId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (Admin)' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product (Admin)' })
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
