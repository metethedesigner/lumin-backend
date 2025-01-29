import { FirebaseService } from '../firebase/firebase.service';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

const { Timestamp } = admin.firestore; 

const firebaseService = new FirebaseService();
const db = firebaseService.getFirestore();

const seedData = async () => {
  //User şifrelerini güvenlik amaçlı hashledim.
  const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
  };

  const today = new Date();

  // Reservations DB sine 1000 kayıt ve her kayıda 1-3 arasında yolcu ekledim.
  const reservations = Array.from({ length: 1000 }, (_, i) => {
    const passengerCount = Math.floor(Math.random() * 3) + 1; 
    const passengers = Array.from({ length: passengerCount }, (_, j) => ({
      name: `Passenger ${Math.random().toString(36).substring(7)}`, 
      age: Math.floor(Math.random() * 60) + 18,
      seatNumber: `A${j + 1}`, 
    }));

    // Rastgele gün ve tarih atamak için işlemler yapıldı.
    const randomDays = Math.floor(Math.random() * 365) + 1;
    const departureDate = new Date(today);
    departureDate.setDate(today.getDate() + randomDays);

    const randomHours = Math.floor(Math.random() * 24);
    departureDate.setHours(randomHours, 0, 0, 0);

    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(departureDate.getHours() + 2);

  
    return {
      id: `reservation${i}`,
      flightNumber: `FL${i}`,
      departureTime: Timestamp.fromDate(departureDate), 
      arrivalTime: Timestamp.fromDate(arrivalDate), 
      passengers: passengers,
    };
  });

  const reservationPromises = reservations.map((reservation) =>
    db.collection('reservations').doc(reservation.id).set(reservation)
  );
  await Promise.all(reservationPromises);

  // Users DB sine veri ekliyorum.
  const users = await Promise.all(
    Array.from({ length: 10 }, async (_, i) => ({
      id: `user${i}`,
      username: i === 0 ? 'admin' : `staff${i}`,
      password: i === 0 ? await hashPassword('admin123') : await hashPassword(`staff${i}`), 
      role: i === 0 ? 'admin' : 'staff',
      email: i === 0 ? 'admin@lumflights.com' : `staff${i}@lumflights.com`,
    }))
  );

  const userPromises = users.map((user) =>
    db.collection('users').doc(user.id).set(user)
  );
  await Promise.all(userPromises);

  console.log('Seed data successfully added to Firestore.');
};

seedData().catch((error) => {
  console.error('Error seeding data:', error);
});

// BU BELGEYİ "npx ts-node src/scripts/seed.ts" komutu ile çalıştırdığımızda firestore dbsine mock kayıtları ekleyeceğiz.