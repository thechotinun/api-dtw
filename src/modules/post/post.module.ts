import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PostRepository } from '@repositories/post.repository';
import { UserRepository } from '@repositories/user.repository';
import { CommunityRepository } from '@repositories/community.repository';
import { PostService as FrontendPostService } from './services/frontend/post.service';
import { PostController as FrontendPostController } from './controllers/frontend/post.controller';
import { AuthenticateMiddleware } from '@common/middlewares/auth/authenticate.middlewares';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FrontendPostController],
  providers: [
    PostRepository,
    UserRepository,
    CommunityRepository,
    FrontendPostService,
  ],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(FrontendPostController);
  }
}
