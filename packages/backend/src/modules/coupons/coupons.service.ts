import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ['PERCENTAGE', 'FIXED'] })
  @IsEnum(['PERCENTAGE', 'FIXED'])
  discountType: string;

  @ApiProperty()
  @IsNumber()
  discountValue: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxUses?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startsAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expiresAt?: string;
}

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async validate(code: string, subtotal: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon || !coupon.isActive) throw new NotFoundException('Invalid coupon');
    if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new NotFoundException('Coupon expired');
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) throw new NotFoundException('Coupon usage limit reached');
    if (coupon.minOrder && subtotal < Number(coupon.minOrder)) throw new NotFoundException(`Minimum order: Rs ${coupon.minOrder}`);

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discount = (subtotal * Number(coupon.discountValue)) / 100;
    } else {
      discount = Number(coupon.discountValue);
    }

    return { coupon, discount, message: 'Coupon applied successfully' };
  }

  async create(dto: CreateCouponDto) {
    return this.prisma.coupon.create({ data: { ...dto, discountValue: dto.discountValue, minOrder: dto.minOrder } });
  }

  async update(id: string, dto: Partial<CreateCouponDto>) {
    return this.prisma.coupon.update({ where: { id }, data: dto as any });
  }

  async delete(id: string) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
