import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
