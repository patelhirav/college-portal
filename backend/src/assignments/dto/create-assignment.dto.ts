import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  branch: string;
}
