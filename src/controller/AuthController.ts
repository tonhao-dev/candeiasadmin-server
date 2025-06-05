import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../entity/error';

class AuthController {
  async isLoggedIn(request: Request, response: Response, next: NextFunction) {
    if (request.isAuthenticated()) {
      return next();
    }

    return response
      .status(401)
      .json(new ValidationError({ message: 'Unauthorized', validations: [] }));
  }

  async getUser(request: Request, response: Response) {
    if (request.user) {
      return response.status(200).json(request.user);
    }

    return response
      .status(401)
      .json(new ValidationError({ message: 'Unauthorized', validations: [] }));
  }

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
