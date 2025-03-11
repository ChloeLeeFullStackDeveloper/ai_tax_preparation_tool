import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firebaseAdmin } from '../firebase.config';

@Injectable()
export class AuthService {
  async validateToken(token: string) {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserData(uid: string) {
    try {
      const user = await firebaseAdmin.auth().getUser(uid);
      return user;
    } catch (error) {
      throw new UnauthorizedException('User not found');
    }
  }
}
