import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}

  async validateToken(token: string) {
    try {
      const decodedToken = await this.firebaseService.auth.verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserData(uid: string) {
    try {
      const user = await this.firebaseService.auth.getUser(uid);
      return user;
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }
}
