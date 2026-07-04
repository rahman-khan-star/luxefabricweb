import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService, CreateCategoryDto } from './categories.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() { return this.categoriesService.findAll(); }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) { return this.categoriesService.findBySlug(slug); }

  @Post()
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  create(@Body() dto: CreateCategoryDto) { return this.categoriesService.create(dto); }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: Partial<CreateCategoryDto>) { return this.categoriesService.update(id, dto); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
  @ApiBearerAuth()
  delete(@Param('id') id: string) { return this.categoriesService.delete(id); }
}
