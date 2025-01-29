import * as express from 'express';
import { User } from '../modules/users/interfaces/user.interface'; 

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}