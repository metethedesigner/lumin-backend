import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule'ü global yapın
      envFilePath: '.env', // .env dosyasını kullanın
    }),
    UsersModule,
    ReservationsModule,
    FirebaseModule,
    AuthModule,
  ],
})
export class AppModule {}