import { ResourceDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';
import { User } from '@entities/user.entity';

export class AuthResource {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => User)
  user: User;
}

export class AuthResourceDto extends ResourceDto {
  @Expose()
  @Type(() => AuthResource)
  data: AuthResource;
}
