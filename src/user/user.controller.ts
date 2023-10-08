import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
  /*{
    "name": "Nombre del Usuario",
    "email": "correo@ejemplo.com",
    "password": "contraseña123"
  }*/

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments')
  getUserComment(@Param('id') id: string) {
    return this.commentService.findUserComments(id);
  }
  /* 
    http://localhost:3000/user/999/comments 
    Headers -> Authorization -> Bearer token
    KEY           | VALUE
    Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwIiwidXNlcm5hbWUiOiJ1c3VhcmlvIiwiaWF0IjoxNjI5MjU0NjY2LCJleH
  */
}
