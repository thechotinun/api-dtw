import { BaseResourceDto } from '@common/resources/base.resource';
import { ResourceWithPaginateDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';
import { Community } from '@entities/community.entity';

export class PostDto extends BaseResourceDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => Community)
  community: Community;
}

export class PostResourceDto extends ResourceWithPaginateDto {
  @Expose()
  @Type(() => PostDto)
  data: PostDto;
}
