import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepo.findOneBy({ username });
  }

  async createUser(userDto: CreateUserDTO): Promise<User> {
    const { password, ...userInfo } = userDto;
    const user = this.userRepo.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    return this.userRepo.save(user);
  }
}
