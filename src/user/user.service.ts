import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOne({ where: { email: userName } });
  }

  async create(inn_data: CreateUserDto) {
    console.log('🚀 ~ UserService ~ create ~ inn_data:', inn_data);
    const user = await this.userRepo.create(inn_data);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    console.log('🚀 ~ UserService ~ create ~ password:', password);
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
}
