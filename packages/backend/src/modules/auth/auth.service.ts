import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto, VerifyOtpDto, SendOtpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
      },
    });

    return this.generateTokens(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email, user.role);
  }

  async sendOtp(dto: SendOtpDto) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    if (dto.phone) {
      await this.prisma.oTP.deleteMany({
        where: { phone: dto.phone, type: dto.type },
      });
      await this.prisma.oTP.create({
        data: { phone: dto.phone, code, type: dto.type, expiresAt },
      });
      // TODO: Send SMS via Twilio
      console.log(`OTP for ${dto.phone}: ${code}`);
    }

    if (dto.email) {
      await this.prisma.oTP.deleteMany({
        where: { email: dto.email, type: dto.type },
      });
      await this.prisma.oTP.create({
        data: { email: dto.email, code, type: dto.type, expiresAt },
      });
      // TODO: Send email via Nodemailer
      console.log(`OTP for ${dto.email}: ${code}`);
    }

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const otp = await this.prisma.oTP.findFirst({
      where: {
        OR: [{ phone: dto.phone }, { email: dto.email }],
        code: dto.code,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) throw new UnauthorizedException('Invalid or expired OTP');

    await this.prisma.oTP.update({
      where: { id: otp.id },
      data: { used: true },
    });

    if (dto.type === 'REGISTER' && dto.phone) {
      const user = await this.prisma.user.upsert({
        where: { phone: dto.phone },
        update: { phoneVerified: new Date() },
        create: {
          phone: dto.phone,
          phoneVerified: new Date(),
          name: `User_${dto.phone.slice(-4)}`,
        },
      });
      return this.generateTokens(user.id, user.email, user.role);
    }

    return { message: 'OTP verified successfully' };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  private generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: userId, email, role },
    };
  }
}
