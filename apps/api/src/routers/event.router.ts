import { EventController } from '@/controllers/event.controller';
import { uploader } from '@/middleware/uploader';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.eventController.getEventData);
    this.router.post('/', this.eventController.createEventData);
    this.router.post(
      '/upload',
      uploader('IMG', '/cover').single('gambar'),
      this.eventController.addNewImage,
    );
    this.router.get('/search', this.eventController.searchEventData);
  }

  getRouter(): Router {
    return this.router;
  }
}
