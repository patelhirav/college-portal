import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginDto } from './dto/login.dto';
import * as moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  /**
   * User, Admin, or SuperAdmin Login
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check if the user exists in any table
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });
    if (superAdmin)
      return this.validateAndGenerateToken(superAdmin, password, 'SUPER_ADMIN');

    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (admin) return this.validateAndGenerateToken(admin, password, 'ADMIN');

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) return this.validateAndGenerateToken(user, password, 'USER');

    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Validate user password and generate JWT token
   */
  private async validateAndGenerateToken(user, password, role) {
    if (!user.password || !password) {
      throw new UnauthorizedException('Password is missing');
    }

    if (typeof user.password !== 'string' || typeof password !== 'string') {
      throw new UnauthorizedException('Invalid password format');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    };
  }

  /**
   * User Signup
   */
  async signup(signupDto: SignupDto) {
    const { name, email, password, branch, year, semester, enr_no } = signupDto;

    // Check if user already exists by email
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw new BadRequestException('User with this email already exists');

    // Check if enr_no already exists
    const existingEnrNo = await this.prisma.user.findUnique({
      where: { enr_no },
    });
    if (existingEnrNo)
      throw new BadRequestException(
        'User with this enrollment number already exists',
      );

    // Validate password
    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Password must be a string');
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
        year,
        semester,
        enr_no,
      },
    });

    return {
      message: 'Signup successful. You can now log in.',
      userId: user.id,
    };
  }

  /**
   * Super Admin Adding Admin
   */
  async addAdmin(adminDto: SignupDto, superAdminId: string) {
    const { name, email, password, branch } = adminDto;

    // Check if the requester is a Super Admin
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { id: superAdminId },
    });

    if (!superAdmin) {
      throw new UnauthorizedException('Only Super Admins can add Admins');
    }

    // Check if admin with this email already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existingAdmin)
      throw new BadRequestException('Admin with this email already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Admin
    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
      },
    });

    return {
      message: 'Admin added successfully',
      adminId: admin.id,
    };
  }

  /**
   * Get all Admins (Only Super Admin can view)
   */
  async getAllAdmins() {
    return this.prisma.admin.findMany({
      select: { id: true, name: true, email: true, branch: true },
    });
  }

  /**
   * Get a single Admin by ID
   */
  async getAdminById(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, name: true, email: true, branch: true },
    });

    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  /**
   * Update Admin (Only Super Admin can update)
   */
  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) throw new NotFoundException('Admin not found');

    const updatedAdmin = await this.prisma.admin.update({
      where: { id: adminId },
      data: {
        name: updateAdminDto.name,
        email: updateAdminDto.email,
        password: updateAdminDto.password
          ? await bcrypt.hash(updateAdminDto.password, 10)
          : undefined,
        branch: updateAdminDto.branch as $Enums.Branch, // ✅ Explicitly cast to Prisma Enum
      },
    });

    return { message: 'Admin updated successfully', updatedAdmin };
  }

  /**
   * Delete Admin (Only Super Admin can delete)
   */
  async deleteAdmin(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) throw new NotFoundException('Admin not found');

    await this.prisma.admin.delete({ where: { id: adminId } });

    return {
      message: 'Admin deleted successfully',
    };
  }

  async sendOtp(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.branch) throw new BadRequestException('User not found');

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
    const otpExpiresAt = moment().add(5, 'minutes').toDate(); 

    await this.prisma.user.update({
      where: { email },
      data: { otp, otpExpiresAt },
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.otp !== otp) throw new BadRequestException('Invalid OTP');

    const now = new Date();
    if (user.otpExpiresAt && user.otpExpiresAt < now) {
      throw new BadRequestException('OTP expired, please request a new one');
    }

    return { message: 'OTP verified successfully' };
  }

  async resendOtp(email: string) {
    return this.sendOtp(email);
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.otp !== otp) throw new BadRequestException('Invalid OTP');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword, otp: null, otpExpiresAt: null },
    });

    return { message: 'Password reset successfully' };
  }
}
