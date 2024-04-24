import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getAppCheck } from 'firebase-admin/app-check';
import { app } from 'firebase-admin';

@Injectable()
export class AuthFirebaseTokenMiddleware implements NestMiddleware {
  constructor(@Inject('FIREBASE_AUTH_APP') private firebaseApp: app.App) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    try {
      const authToke = await this.firebaseApp.auth().verifyIdToken(body.token);
      const uid = authToke.uid;
      req.headers['user'] = authToke.email;
      console.log('ok : ', authToke);
      next();
    } catch (error) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }
}
