import { Controller, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN', 'SUPER_ADMIN']))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (Admin)' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.usersService.findAll(parseInt(page || '1'), parseInt(limit || '20'));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (Admin)' })
  findById(@Param('id') id: string) { return this.usersService.findById(id); }

  @Put(':id/role')
  @ApiOperation({ summary: 'Update user role (Admin)' })
  updateRole(@Param('id') id: string, @Body('role') role: string) { return this.usersService.updateRole(id, role); }
}
