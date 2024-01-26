import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  async getEventData(req: Request, res: Response) {
    try {
      const eventData = await prisma.event.findMany();
      return res.status(200).send(eventData);
    } catch (error: any) {
      console.log(error);
    }
  }

  async createEventData(req: Request, res: Response) {
    try {
      const { title, speaker, description, date, time, duration, price } =
        req.body;

      const newEventData = await prisma.event.create({
        data: { title, speaker, description, date, time, duration, price },
      });
      return res.status(201).send(newEventData);
    } catch (error: any) {
      console.log(error);
    }
  }

  async searchEventData(req: Request, res: Response) {
    try {
      const { search } = req.query;

      let eventData;

      if (search) {
        eventData = await prisma.event.findMany({
          where: {
            OR: [
              { title: { contains: search as string } },
              { speaker: { contains: search as string } },
              { description: { contains: search as string } },
            ],
          },
        });
      } else {
        eventData = await prisma.event.findMany();
      }

      return res.status(200).send(eventData);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  async addNewImage(req: Request, res: Response) {
    try {
      console.log(req.file);

      return res
        .status(200)
        .send(`file ${req.file?.filename} successfully uploaded`);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}
