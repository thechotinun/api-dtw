import { User } from '@entities/user.entity';
import { Post } from '@entities/post.entity';
import { UserException } from '@exceptions/app/user.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { PostService } from '@modules/post/services/frontend/post.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    private readonly postService: PostService,
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

  async ourBlog(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Post>> {
    const { id } = user;
    const data = this.postService.paginateOurBlog(options, id);

    return data;
  }
}
