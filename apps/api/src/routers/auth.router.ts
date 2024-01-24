import { Router } from 'express';
import { regisValidation, loginValidation } from '../middleware/validator';
import { AuthController } from '@/controllers/auth.contoller';
import { verifyToken } from '@/middleware/jwt';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/regis',
      regisValidation,
      this.authController.registerUser,
    );
    this.router.post('/login', loginValidation, this.authController.loginUser);
    this.router.get('/keepLogin', verifyToken, this.authController.keepLogin);
  }
  getRouter(): Router {
    return this.router;
  }
}
