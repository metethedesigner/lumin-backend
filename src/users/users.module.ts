import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { JwtAuthModule } from '../auth/jwt.auth.module'; 

@Module({
  imports: [FirebaseModule, JwtAuthModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}