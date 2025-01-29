import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { ReservationsController } from './controllers/reservations.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    FirebaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your secret here
      signOptions: { expiresIn: '1h' }, // Optional: set token expiration
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}