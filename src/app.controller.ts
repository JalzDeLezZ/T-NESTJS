import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/createUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-post')
  testPost(@Body() payload: CreateUserDto) {
    console.log('🚀 ~ AppController ~ testPost ~ payload', payload);
    return payload;
  }
}
