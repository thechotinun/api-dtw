import {
  Req,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { PaginateQuery } from '@common/dto/paginate.query';
import { PostService } from '@modules/post/services/frontend/post.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { PostResourceDto } from '@modules/post/resources/post.resource';
import {
  CreatePostDto,
  CreateCommentDto,
} from '@modules/post/dto/create-post.dto';
import {
  UpdatePostDto,
  UpdateCommentDto,
} from '@modules/post/dto/update-post.dto';
import { AuthenticatedRequest } from '@common/middlewares/auth/authenticate.middlewares';

@Controller('api/v1/frontend/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseResources(PostResourceDto)
  async paginate(
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      const reponse = await this.postService.paginate({
        page,
        limit,
      });

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.postService.findOneById(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Post()
  async create(
    @Req() request: Request,
    @Body() payload: CreatePostDto,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.create(payload, user);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Post(':postId/comment')
  async createComment(
    @Req() request: Request,
    @Param('postId') postId: number,
    @Body() payload: CreateCommentDto,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.createComment(
        postId,
        payload,
        user,
      );

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() payload: UpdatePostDto,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.update(id, payload, user);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Patch(':postId/comment/:id')
  async updateComment(
    @Req() request: Request,
    @Param('postId') postId: number,
    @Param('id') id: number,
    @Body() payload: UpdateCommentDto,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.updateComment(
        postId,
        id,
        payload,
        user,
      );

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Delete(':id')
  async remove(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.remove(id, user);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Delete(':postId/comment/:id')
  async removeComment(
    @Req() request: Request,
    @Param('postId') postId: number,
    @Param('id') id: number,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const response = await this.postService.removeComment(postId, id, user);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
