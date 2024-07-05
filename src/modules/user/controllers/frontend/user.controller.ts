import { Req, Controller, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { PaginateQuery } from '@common/dto/paginate.query';
import { UserService } from '@modules/user/services/frontend/user.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { UserResourceDto } from '@modules/user/resources/user.resource';
import { AuthenticatedRequest } from '@common/middlewares/auth/authenticate.middlewares';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/v1/frontend/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('ourblog')
  @UseResources(UserResourceDto)
  async paginateOurBlog(
    @Req() request: Request,
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      const user = (request as AuthenticatedRequest).user;
      const reponse = await this.userService.ourBlog(
        {
          page,
          limit,
        },
        user,
      );

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
