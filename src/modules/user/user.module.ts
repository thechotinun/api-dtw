import { Module } from '@nestjs/common';
import { UserService as FrontendUserService } from './services/frontend/user.service';
import { UserRepository } from '@repositories/user.repository';

@Module({
  providers: [FrontendUserService, UserRepository],
  exports: [FrontendUserService],
})
export class UserModule {}
