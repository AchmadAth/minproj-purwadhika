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
      const { title, speaker, description, date, price } = req.body;

      const newEventData = await prisma.event.create({
        data: { title, speaker, description, date, price },
      });
      return res.status(201).send(newEventData);
    } catch (error: any) {
      console.log(error);
    }
  }
}
