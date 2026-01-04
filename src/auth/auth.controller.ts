import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: { username: string; password: string}) {
    return this.authService.register(body.username, body.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    return {
      success: true,
      message: 'Deconnecté avec succès',
    }
  }
}