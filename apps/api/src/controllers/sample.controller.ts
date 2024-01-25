import { Request, Response } from 'express';
import prisma from '@/prisma';
import { transporter } from '@/helpers/nodemailer';
import fs from 'fs';
import { join } from 'path';
import handlebars from 'handlebars';

export class SampleController {
  async getSampleData(req: Request, res: Response) {
    const sampleData = await prisma.sample.findMany();

    return res.status(200).send(sampleData);
  }

  async getSampleDataById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.sample.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }

  async createSampleData(req: Request, res: Response) {
    const { name, code } = req.body;

    const newSampleData = await prisma.sample.create({
      data: { name, code },
    });

    return res.status(201).send(newSampleData);
  }
  async sendMail(req: Request, res: Response) {
    try {
      // Mendefinisikan lokasi template dan membacanya dengan fs
      const templateSource = fs.readFileSync(
        join(__dirname, '../templates/mail.hbs'),
        'utf-8',
      );
      const compiledTemplate = handlebars.compile(templateSource);

      await transporter.sendMail({
        from: 'Review API Mailer',
        to: req.body.email,
        subject: 'Welcome to mailer',
        html: compiledTemplate({ name: req.body.email.split('@')[0] }),
      });

      return res.status(200).send('Send email success');
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}
