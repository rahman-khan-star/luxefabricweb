import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, ProductFilterDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: ProductFilterDto) {
    const page = parseInt(filters.page || '1');
    const limit = parseInt(filters.limit || '12');
    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { has: filters.search } },
      ];
    }

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.brandId) where.brandId = filters.brandId;

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) where.price.lte = parseFloat(filters.maxPrice);
    }

    if (filters.size || filters.color) {
      where.variants = {
        some: {
          AND: [
            filters.size ? { size: filters.size } : {},
            filters.color ? { color: filters.color } : {},
          ].filter((c) => Object.keys(c).length > 0),
        },
      };
    }

    const orderBy: any = {};
    if (filters.sortBy) {
      orderBy[filters.sortBy] = filters.sortOrder || 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: { take: 1, orderBy: { sortOrder: 'asc' } },
          variants: { where: { isActive: true } },
          category: { select: { name: true, slug: true } },
          brand: { select: { name: true, slug: true } },
          _count: { select: { reviews: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true } },
        category: true,
        brand: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true } },
      },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findFeatured() {
    return this.prisma.product.findMany({
      where: { isPublished: true, isFeatured: true },
      include: {
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true }, take: 4 },
        category: { select: { name: true } },
        _count: { select: { reviews: true } },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findNewArrivals() {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      include: {
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true }, take: 4 },
        category: { select: { name: true } },
        _count: { select: { reviews: true } },
      },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBestSellers() {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      include: {
        images: { take: 1, orderBy: { sortOrder: 'asc' } },
        variants: { where: { isActive: true }, take: 4 },
        category: { select: { name: true } },
        _count: { select: { orderItems: true, reviews: true } },
      },
      orderBy: { orderItems: { _count: 'desc' } },
      take: 8,
    });
  }

  async create(dto: CreateProductDto) {
    const { variants, images, ...productData } = dto;

    return this.prisma.product.create({
      data: {
        ...productData,
        price: productData.price,
        variants: variants
          ? {
              create: variants.map((v) => ({
                ...v,
                price: v.price,
              })),
            }
          : undefined,
        images: images
          ? { create: images.map((url, i) => ({ url, sortOrder: i })) }
          : undefined,
      },
      include: { images: true, variants: true },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        price: dto.price !== undefined ? dto.price : undefined,
      },
      include: { images: true, variants: true },
    });
  }

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async getRelated(productId: string, categoryId: string) {
    return this.prisma.product.findMany({
      where: {
        categoryId,
        id: { not: productId },
        isPublished: true,
      },
      include: {
        images: { take: 1 },
        _count: { select: { reviews: true } },
      },
      take: 4,
    });
  }
}
