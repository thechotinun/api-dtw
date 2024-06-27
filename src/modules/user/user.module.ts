import { Module } from '@nestjs/common';
import { UserService as FrontendUserService } from './services/frontend/user.service';
import { UserService as BackendUserService } from './services/backend/user.service';
import { UserRepository } from '@repositories/user.repository';

@Module({
  providers: [FrontendUserService, BackendUserService, UserRepository],
  exports: [FrontendUserService, BackendUserService],
})
export class UserModule {}
