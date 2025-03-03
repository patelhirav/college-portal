import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { AdminModule } from './admin/admin.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [AuthModule, AssignmentsModule, AdminModule, UploadsModule],
  providers: [PrismaService],
})
export class AppModule {}
