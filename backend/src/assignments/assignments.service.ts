import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async getAllAssignments() {
    return this.prisma.assignment.findMany();
  }

  async createAssignment(adminId: string, dto: CreateAssignmentDto) {
    return await this.prisma.assignment.create({
      data: {
        ...dto,
        adminId,
      },
    });
  }

  async getAssignmentsForUser(branch: string, year: number) {
    return await this.prisma.assignment.findMany({
      where: { branch, year },
    });
  }
}
