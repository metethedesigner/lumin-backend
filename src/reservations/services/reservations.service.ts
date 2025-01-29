import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { Reservation } from '../interfaces/reservation.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class ReservationsService {
  constructor(private firebaseService: FirebaseService) {}

  async getFilteredReservations(
    user: User,
    page: number = 1,
    limit: number = 5,
    startDate?: Date,
    endDate?: Date
  ) {
    if (user.role === 'admin') {
      return this.getReservations(page, limit, startDate, endDate);
    } else {
      return this.getStaffReservations(page, limit);
    }
  }

  private async getReservations(
    page: number,
    limit: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<{ data: Reservation[]; total: number }> {
    // Ortak firestore query işlemleri burada...
    const db = this.firebaseService.getFirestore();
    let query = db.collection('reservations').orderBy('departureTime');
    if (startDate) query = query.where('departureTime', '>=', startDate);
    if (endDate) query = query.where('departureTime', '<=', endDate);

    return this.executePaginatedQuery(query, page, limit);
  }

  private async getStaffReservations(
    page: number,
    limit: number
  ): Promise<{ data: Reservation[]; total: number }> {
    const db = this.firebaseService.getFirestore();
    const query = db.collection('reservations').orderBy('id');
    return this.executePaginatedQuery(query, page, limit);
  }

  private async executePaginatedQuery(query, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const totalSnapshot = await query.get();
    const total = totalSnapshot.size;

    if (page > 1) {
      const previousSnapshot = await query.limit(offset).get();
      const lastDoc = previousSnapshot.docs[previousSnapshot.docs.length - 1];
      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.limit(limit).get();
    const data = snapshot.docs.map((doc: FirebaseFirestore.DocumentSnapshot) => doc.data() as Reservation);

    return { data, total };
  }
}
