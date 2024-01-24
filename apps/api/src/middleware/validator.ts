import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const regisValidation = [
  body('username').notEmpty().withMessage('Username Required'),
  body('email').notEmpty().withMessage('Email Required'),
  body('email').isEmail().withMessage('Email Wrong'),
  body('password').notEmpty().withMessage('Password Required'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 0,
    })
    .withMessage('Password min 6, Uppercase min 1, digit min 1'),
  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req); //untuk menampung jika ada error dari middleware validator
    if (!errorValidator.isEmpty()) {
      return res.status(400).send({ error: errorValidator.array() });
    }
    next(); // jika error validator kosong maka lanjut ke controller register
  },
];

export const loginValidation = [
  // Validate username is not empty
  body('email').notEmpty().withMessage('Username is required'),

  // Validate password is not empty
  body('password').notEmpty().withMessage('Password is required'),

  // You can add more validation rules as needed
  // For example, check for valid email format, password length, etc.
  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req); // To store any errors from the middleware validator
    if (!errorValidator.isEmpty()) {
      return res.status(400).send({ error: errorValidator.array() });
    }
    next(); // If there are no validation errors, proceed to the controller for login
  },
];
