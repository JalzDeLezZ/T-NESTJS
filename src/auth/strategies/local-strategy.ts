import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Indica que el campo 'email' se utilizará como nombre de usuario
      passwordField: 'password', // Indica que el campo 'password' se utilizará como contraseña

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // or fromHeader('authorization') if you use headers
      secretOrKey: 'secretjwt4565', // Provide your secret key here
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
