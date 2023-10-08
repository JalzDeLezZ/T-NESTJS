import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  /* {"xemail":"correo@ejemplo.com","password":"contraseña123"} */

  @Post('register')
  // async register() { return 'register'; }
  async registerUser(@Body() payload: CreateUserDto) {
    return await this.userService.create(payload);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshTk(@Request() req) {
    return await this.authService.fn_refreshToken(req.user);
  }
  /* 
  http://localhost:3000/auth/refresh
  JSON Body:
  {
    "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvcnJlb0BlamVtcGxvLmNvbSIsInN1YiI6eyJpZCI6MSwibmFtZSI6Ik5vbWJyZSBkZWwgVXN1YXJpbyJ9LCJpYXQiOjE2OTY3OTczNjMsImV4cCI6MTY5NzQwMjE2M30.C9-UTKErNDtjT1pnjDJ2dI_xWSWroNN_ZTySEzgrfyU"
  }
  */
}
