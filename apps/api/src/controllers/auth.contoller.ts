import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { genSalt, hash, compare } from 'bcrypt';
import { transporter } from '@/helpers/nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars, { log } from 'handlebars';
import { sign, verify } from 'jsonwebtoken';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role, referralCode } = req.body;

      // Check if the user with the provided email already exists
      const checkUser = await prisma.user.findUnique({
        where: { email },
      });
      if (checkUser) {
        throw new Error('Email is already exist');
      }

      // Generate hash for password
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      // Generate unique referral code
      const refcode = generateReferralCode();

      // Check if referralCode is provided and valid
      if (referralCode) {
        const referringUser = await prisma.user.findUnique({
          where: { refcode: referralCode },
        });
        if (referringUser) {
          // If referring user found, add points to the referring user
          await prisma.user.update({
            where: { id: referringUser.id },
            data: {
              point: {
                increment: 10000,
              },
            },
          });
        }
      }
      // Create the new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashPassword,
          point: 0, // Set initial points to 0
          refcode, // Save the referral code
          role,
        },
      });

      // Access email template
      const templateMail = path.join(
        __dirname,
        '../templates',
        'registrasi.hbs',
      );
      const templateSource = fs.readFileSync(templateMail, 'utf-8');
      const compileTemplate = handlebars.compile(templateSource);

      // Send registration success email
      await transporter.sendMail({
        from: 'Event',
        to: email,
        subject: 'Registration Success',
        html: compileTemplate({ name: username }),
      });

      res.status(201).send({ success: true, result: newUser });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      console.log(req.body);
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (!user) {
        throw new Error('[INVALID] Email or Password');
      }

      const isValidPassword = await compare(req.body.password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      // Enkripsi
      const jwtToken = sign(
        { id: user.id, role: user.role, email: user.email },
        'budi123',
      );

      return res.status(200).send({
        username: user.username,
        email: user.email,
        token: jwtToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  async keepLogin(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.dataUser.email },
      });

      if (!user) {
        throw new Error('[INVALID] Email or Password');
      }

      const jwtToken = sign(
        { id: user.id, role: user.role, email: user.email },
        'budi123',
      );

      return res.status(200).send({
        username: user.username,
        email: user.email,
        token: jwtToken,
      });
      console.log('Terjemahan token', req.dataUser);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  }
}

// Function to generate a referral code using random characters
function generateReferralCode(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let referralCode = '';
  for (let i = 0; i < 8; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return referralCode;
}

// auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};
