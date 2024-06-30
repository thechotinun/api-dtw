import { BaseResourceDto } from '@common/resources/base.resource';
import { ResourceWithPaginateDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';

class CommunityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

// class CommentDto {
//   @Expose()
//   id: number;

//   @Expose()
//   text: string;
// }

export class UserDto extends BaseResourceDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => CommunityDto)
  community: CommunityDto;

  // @Expose()
  // @Type(() => CommentDto)
  // comment: CommentDto;

  @Expose()
  commentCount: number;
}

export class UserResourceDto extends ResourceWithPaginateDto {
  @Expose()
  @Type(() => UserDto)
  data: UserDto;
}
