import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDecimal,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Royal Silk Organza' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'royal-silk-organza' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Premium quality silk organza fabric' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'SLK-001' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: 129.99 })
  @IsOptional()
  @IsNumber()
  compareAt?: number;

  @ApiPropertyOptional({ example: 45.00 })
  @IsOptional()
  @IsNumber()
  costPrice?: number;

  @ApiProperty({ example: 'clxyz123' })
  @IsString()
  categoryId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: ['silk', 'premium', 'wedding'] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaDesc?: string;

  @ApiPropertyOptional({ type: [CreateProductVariantDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants?: CreateProductVariantDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  images?: string[];
}

export class CreateProductVariantDto {
  @ApiProperty({ example: 'SLK-001-BL' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 'Royal Silk - Black' })
  @IsString()
  name: string;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  compareAt?: number;

  @ApiPropertyOptional({ example: 'L' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({ example: 'Black' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: '#000000' })
  @IsOptional()
  @IsString()
  colorHex?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  compareAt?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class ProductFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  minPrice?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  maxPrice?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ default: 'desc' })
  @IsOptional()
  @IsString()
  sortOrder?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional()
  @IsString()
  limit?: string;
}
