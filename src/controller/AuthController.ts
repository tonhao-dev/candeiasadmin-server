import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../entity/error';

class AuthController {
  async logout(request: Request, response: Response, next: NextFunction) {
    if (!request.logout) {
      return response
        .status(400)
        .json(new ValidationError({ message: 'Logout is not available', validations: [] }));
    }

    request.logOut(err => {
      if (err) return next(err);

      response.redirect('/');
    });
  }
}

export { AuthController };
