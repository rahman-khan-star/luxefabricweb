import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true, email: true, name: true, phone: true,
          role: true, createdAt: true, _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip, take: limit,
      }),
      this.prisma.user.count(),
    ]);
    return { users, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true, email: true, name: true, phone: true, role: true, avatar: true,
        addresses: true, _count: { select: { orders: true, reviews: true } },
      },
    });
  }

  async updateRole(id: string, role: string) {
    return this.prisma.user.update({ where: { id }, data: { role: role as any } });
  }
}
