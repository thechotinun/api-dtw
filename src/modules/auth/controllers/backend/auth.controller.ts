import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/backend/auth.service';
import { LoginDto } from '@modules/auth/dto/backend/login.dto';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { AuthResourceDto } from '@modules/auth/resources/backend/auth.resource';
import { ApiResource } from '@common/reponses/api-resource';

@Controller('api/v1/backend/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseResources(AuthResourceDto)
  async signIn(@Body() credential: LoginDto): Promise<ApiResource> {
    try {
      const reponse = await this.authService.signIn(credential);

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
