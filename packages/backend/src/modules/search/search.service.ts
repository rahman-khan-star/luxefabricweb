import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = {
      isPublished: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
        { tags: { has: query } },
        { category: { name: { contains: query, mode: 'insensitive' as const } } },
        { brand: { name: { contains: query, mode: 'insensitive' as const } } },
      ],
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          images: { take: 1 },
          category: { select: { name: true, slug: true } },
          brand: { select: { name: true } },
        },
        skip, take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async suggestions(query: string) {
    return this.prisma.product.findMany({
      where: {
        isPublished: true,
        name: { contains: query, mode: 'insensitive' },
      },
      select: { id: true, name: true, slug: true },
      take: 5,
    });
  }
}
