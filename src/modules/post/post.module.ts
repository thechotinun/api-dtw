import { Module } from '@nestjs/common';
import { PostRepository } from '@repositories/post.repository';
import { CommunityRepository } from '@repositories/community.repository';
import { PostService as FrontendPostService } from './services/frontend/post.service';
import { PostController as FrontendPostController } from './controllers/frontend/post.controller';

@Module({
  imports: [],
  controllers: [FrontendPostController],
  providers: [PostRepository, CommunityRepository, FrontendPostService],
})
export class PostModule {}
