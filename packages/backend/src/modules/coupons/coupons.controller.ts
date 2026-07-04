import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CouponsService, CreateCouponDto } from './coupons.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private couponsService: CouponsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  findAll() { return this.couponsService.findAll(); }

  @Post('validate')
  @ApiOperation({ summary: 'Validate coupon code' })
  validate(@Body('code') code: string, @Body('subtotal') subtotal: number) {
    return this.couponsService.validate(code, subtotal);
  }

  @Post()
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  create(@Body() dto: CreateCouponDto) { return this.couponsService.create(dto); }

  @Put(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: Partial<CreateCouponDto>) { return this.couponsService.update(id, dto); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  delete(@Param('id') id: string) { return this.couponsService.delete(id); }
}
