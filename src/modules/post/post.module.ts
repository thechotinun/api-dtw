import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { PostRepository } from '@repositories/post.repository';
import { UserRepository } from '@repositories/user.repository';
import { CommunityRepository } from '@repositories/community.repository';
import { CommentRepository } from '@repositories/comment.repository';
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
    CommentRepository,
    FrontendPostService,
  ],
  exports: [FrontendPostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: 'api/v1/frontend/post', method: RequestMethod.GET },
        { path: 'api/v1/frontend/post/:id', method: RequestMethod.GET },
      )
      .forRoutes(FrontendPostController);
  }
}
