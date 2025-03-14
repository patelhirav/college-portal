import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto/assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';


@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @ApiBody({
    type: CreateAssignmentDto,
    examples: {
      example1: {
        summary: 'Default Create Assignment Example',
        value: {
          title: '',
          subject: '',
          year: '',
          branch: '',
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() dto: CreateAssignmentDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const adminId: string = req.user.id;
    return this.assignmentService.create(dto, adminId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  @ApiBody({
    type: UpdateAssignmentDto,
    examples: {
      example1: {
        summary: 'Default Update Assignment Example',
        value: {
          title: '',
          subject: '',
          year: '',
          branch: '',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssignmentDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const adminId: string = req.user.id;
    return this.assignmentService.update(id, dto, adminId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(id);
  }
}
