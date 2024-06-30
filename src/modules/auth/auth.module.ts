import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService as FrontendAuthService } from './services/frontend/auth.service';
import { AuthController as FrontendAuthController } from './controllers/frontend/auth.controller';
import { OauthUserRepository } from '@repositories/o-auth.repository';
import { UserRepository } from '@repositories/user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [FrontendAuthService, OauthUserRepository, UserRepository],
  controllers: [FrontendAuthController],
  exports: [FrontendAuthService],
})
export class AuthModule {}
