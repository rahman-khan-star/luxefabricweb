import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsString()
  variantId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ enum: ['COD', 'JAZZCASH', 'EASYPAISA', 'STRIPE', 'BANK_TRANSFER'] })
  @IsEnum(['COD', 'JAZZCASH', 'EASYPAISA', 'STRIPE', 'BANK_TRANSFER'])
  paymentMethod: string;

  @ApiProperty()
  @IsString()
  shippingName: string;

  @ApiProperty()
  @IsString()
  shippingPhone: string;

  @ApiProperty()
  @IsString()
  shippingAddress: string;

  @ApiProperty()
  @IsString()
  shippingCity: string;

  @ApiProperty()
  @IsString()
  shippingProvince: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  addressId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    let subtotal = 0;
    const orderItems = [];

    for (const item of dto.items) {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true },
      });

      if (!variant) throw new BadRequestException(`Variant not found: ${item.variantId}`);

      const itemTotal = Number(variant.price) * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        name: variant.product.name,
        sku: variant.sku,
        price: variant.price,
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    let discount = 0;
    if (dto.couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: dto.couponCode },
      });
      if (coupon && coupon.isActive) {
        if (coupon.discountType === 'PERCENTAGE') {
          discount = (subtotal * Number(coupon.discountValue)) / 100;
        } else {
          discount = Number(coupon.discountValue);
        }
        await this.prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    const shippingCost = subtotal >= 5000 ? 0 : 200;
    const total = subtotal + shippingCost - discount;

    const orderNumber = `LXF-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        userId,
        paymentMethod: dto.paymentMethod as any,
        subtotal,
        shippingCost,
        discount,
        total,
        couponCode: dto.couponCode,
        shippingName: dto.shippingName,
        shippingPhone: dto.shippingPhone,
        shippingAddress: dto.shippingAddress,
        shippingCity: dto.shippingCity,
        shippingProvince: dto.shippingProvince,
        notes: dto.notes,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    return order;
  }

  async findAll(userId?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const where = userId ? { userId } : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: true,
          user: { select: { name: true, email: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        user: { select: { name: true, email: true, phone: true } },
        payment: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status: status as any },
    });
  }
}
