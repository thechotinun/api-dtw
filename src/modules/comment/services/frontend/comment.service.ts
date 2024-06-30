import { Post } from '@entities/post.entity';
import { User } from '@entities/user.entity';
import { PostException } from '@exceptions/app/post.exception';
import { CreatePostDto } from '@modules/post/dto/create-post.dto';
import { UpdatePostDto } from '@modules/post/dto/update-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '@repositories/post.repository';
import { CommunityRepository } from '@repositories/community.repository';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UpdateResult } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,

    @InjectRepository(CommunityRepository)
    private readonly communityRepository: CommunityRepository,
  ) {}

  async checkCommunity(communityId: number) {
    return await this.communityRepository.findOne({
      where: { id: communityId },
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Post>> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.community', 'community')
      .orderBy('posts.createdDate', 'DESC');

    return paginate<Post>(queryBuilder, options);
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postRepository
      .findOneOrFail({
        where: {
          id: id,
        },
        relations: ['community'],
      })
      .catch(() => {
        throw PostException.notFound();
      });
  }

  async create(payload: CreatePostDto, user: User): Promise<Post> {
    try {
      const community = await this.checkCommunity(payload.community);

      if (!community) {
        throw new Error('COMMUNITY_NOT_FOUND');
      }

      const create = await this.postRepository.create(payload);
      create.user = user.id;
      create.createdBy = user.id;
      create.updatedBy = user.id;

      return await this.postRepository.save(create);
    } catch (error) {
      throw PostException.createError(error.message);
    }
  }

  async update(id: number, payload: UpdatePostDto, user: User): Promise<Post> {
    try {
      const community = await this.checkCommunity(payload.community);

      if (!community) {
        throw new Error('COMMUNITY_NOT_FOUND');
      }
      const post = await this.postRepository.findOne({
        where: { id: id, user: user.id },
      });
      if (!post) {
        throw new Error('POST_NOT_FOUND');
      }

      await this.postRepository.update(id, {
        ...payload,
        updatedBy: user.id,
      });

      return await this.findOneById(id);
    } catch (error) {
      throw PostException.updateError(error.message);
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      await this.findOneById(id);

      return await this.postRepository.softDelete(id);
    } catch (error) {
      throw PostException.deleteError(error.message);
    }
  }
}
