import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  //   findAll() {
  //     return this.usersRepository.find();
  //   }

  //   findOne(id: number) {
  //     return this.usersRepository.findOne(id);
  //   }

  //   update(id: number, updateUserDto: UpdateUserDto) {
  //     return this.usersRepository.update(id, updateUserDto);
  //   }

  //   remove(id: number) {
  //     return this.usersRepository.delete(id);
  //   }
}
