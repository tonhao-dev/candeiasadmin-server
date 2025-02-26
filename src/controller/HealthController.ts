import { Request, Response } from 'express';

class HealthCheckController {
  async check(_: Request, response: Response) {
    response.send('OK');
  }
}

export { HealthCheckController };
