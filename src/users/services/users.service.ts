import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private firebaseService: FirebaseService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const usersSnapshot = await db.collection('users').where('username', '==', username).get();
  
    if (usersSnapshot.empty) {
      throw new UnauthorizedException('User not found'); // Burada daha anlamlı bir hata mesajı verebiliriz
    }
  
    const userDoc = usersSnapshot.docs[0];
    const user = userDoc.data();
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
  
    return {
      id: userDoc.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin',
    };
  }
}
