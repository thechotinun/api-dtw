import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserController as FrontendUserController } from './controllers/frontend/user.controller';
import { UserService as FrontendUserService } from './services/frontend/user.service';
import { UserRepository } from '@repositories/user.repository';
import { PostModule } from '@modules/post/post.module';
import { AuthenticateMiddleware } from '@common/middlewares/auth/authenticate.middlewares';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [FrontendUserController],
  providers: [FrontendUserService, UserRepository],
  exports: [FrontendUserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(FrontendUserController);
  }
}
