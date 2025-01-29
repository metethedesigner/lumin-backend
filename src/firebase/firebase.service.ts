import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase-admin-key.json'; // İndirdiğiniz JSON dosyası

@Injectable()
export class FirebaseService {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    this.db = admin.firestore();
  }

  getFirestore() {
    return this.db;
  }
}