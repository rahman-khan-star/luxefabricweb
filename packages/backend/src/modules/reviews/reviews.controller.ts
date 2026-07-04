import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService, CreateReviewDto } from './reviews.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update review' })
  create(@Request() req, @Body() dto: CreateReviewDto) {
    return this.reviewsService.create(req.user.id, dto);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get reviews for product' })
  findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Put(':id/approve')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  approve(@Param('id') id: string) { return this.reviewsService.approve(id); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
  @ApiBearerAuth()
  delete(@Param('id') id: string) { return this.reviewsService.delete(id); }
}
