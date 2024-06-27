import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService as BackendAuthService } from './services/backend/auth.service';
import { AuthService as FrontendAuthService } from './services/frontend/auth.service';
import { AuthController as BackendAuthController } from './controllers/backend/auth.controller';
import { AuthController as FrontendAuthController } from './controllers/frontend/auth.controller';
import { OauthUserRepository } from '@repositories/o-auth.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [BackendAuthService, FrontendAuthService, OauthUserRepository],
  controllers: [BackendAuthController, FrontendAuthController],
  exports: [BackendAuthService, FrontendAuthService],
})
export class AuthModule {}
