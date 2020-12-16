import { Response, Request } from 'express';
// import passport from 'passport';

class AuthController {
  public message: string;

  constructor() {
    this.message = 'Signed up';
  }

  public signUp(req: Request, res: Response) {
    const test: string = this.message;
    res.status(200).json({ result: test });
  }
}

export default AuthController;
