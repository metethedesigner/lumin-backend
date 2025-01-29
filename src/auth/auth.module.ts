import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthModule } from './jwt.auth.module';

@Module({
  imports: [JwtAuthModule],
  providers: [JwtStrategy],
  exports: [JwtAuthModule],
})
export class AuthModule {}