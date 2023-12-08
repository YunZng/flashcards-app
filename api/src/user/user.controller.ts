import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { UserResponseDTO } from './user-response.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDTO } from './login-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async createUser(
    @Body()
    userDto: CreateUserDTO,
  ): Promise<UserResponseDTO> {
    const userCheck = await this.userService.findOne(userDto.username);
    if (userCheck) {
      throw new BadRequestException('Unknown Error!');
    }
    const user = await this.userService.createUser(userDto);
    delete user.password;
    return user;
  }

  @Post('login')
  async login(@Body() userDto: LoginUserDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.authService.validateUser(
      userDto.username,
      userDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
