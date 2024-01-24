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
      const { username, email, password } = req.body;
      const checkUser = await prisma.user.findUnique({
        where: { email },
      });
      if (checkUser) {
        throw new Error('Email is already exist');
      }
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashPassword,
        },
      });
      // access templait email
      const templateMail = path.join(
        __dirname,
        '../templates',
        'registrasi.hbs',
      );
      const templateSource = fs.readFileSync(templateMail, 'utf-8');
      const compileTemplate = handlebars.compile(templateSource);

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
