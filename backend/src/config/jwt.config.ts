import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt.config',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRETS,
  }),
);
