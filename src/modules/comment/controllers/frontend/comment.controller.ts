import {
  Req,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from '@modules/post/services/frontend/post.service';
import { ApiResource } from '@common/reponses/api-resource';
import { CreatePostDto } from '@modules/post/dto/create-post.dto';
import { UpdatePostDto } from '@modules/post/dto/update-post.dto';
import { AuthenticatedRequest } from '@common/middlewares/auth/authenticate.middlewares';

@Controller('api/v1/frontend/comment')
export class PostController {
  constructor(private readonly postService: PostService) {}

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

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.postService.remove(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
