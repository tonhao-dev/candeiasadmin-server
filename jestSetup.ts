jest.mock('passport', () => ({
  initialize: jest.fn(() => (_req: any, _res: any, next: () => any) => next()),
  session: jest.fn(() => (_req: any, _res: any, next: () => any) => next()),
  use: jest.fn(),
  authenticate: jest.fn(() => (_req: any, _res: any, next: () => any) => next()),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
}));

jest.mock('./src/controller/AuthController', () => {
  return {
    AuthController: jest.fn().mockImplementation(() => {
      return {
        isLoggedIn: jest.fn((_req, _res, next) => {
          next();
        }),
        logout: jest.fn((req, res) => {
          req.logout();
          res.redirect('/');
        }),
      };
    }),
  };
});
