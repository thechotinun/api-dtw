import { User } from '@entities/user.entity';
import { UserException } from '@exceptions/app/user.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findOne(userName: string): Promise<User> {
    return await this.userRepository
      .findOneOrFail({
        where: {
          userName: userName,
        },
      })
      .catch(() => {
        throw UserException.notFound();
      });
  }
}
