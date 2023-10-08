import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false, // Si es true, no se comprueba la expiración del token
      secretOrKey: `secretjwt4565`,
      // secretOrKey: `${process.env.jwt_secret}}`, //! No funciona
    });
  }

  async validate(payload: any) {
    return {
      user: payload.sub,
      username: payload.username,
    };
  }
}
