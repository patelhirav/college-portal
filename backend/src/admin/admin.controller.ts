import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superadmin')
  async createAdmin(@Body() dto: CreateAdminDto, @Req() req) {
    return this.adminService.createAdmin(dto, req.user.role);
  }
  @Get()
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }
}
