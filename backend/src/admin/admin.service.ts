import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllAdmins() {
    return this.prisma.admin.findMany();
  }

  async createAdmin(dto: CreateAdminDto, createdByRole: string) {
    if (createdByRole !== 'superadmin') {
      throw new ForbiddenException('Only Super Admin can create Admins');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.admin.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        branch: dto.branch,
      },
    });
  }
}
