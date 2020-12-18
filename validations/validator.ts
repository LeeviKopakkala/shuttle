import { validationResult, body } from 'express-validator';

class Validator {
    public validateUser = [
      body('email').isEmail().withMessage('Check your email'),
      body('password').isLength({ min: 6 }).withMessage('Password minimum length: 6'),
      body('name').isLength({ min: 2 }).withMessage('Check your name'),
      // eslint-disable-next-line consistent-return
      (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
      },
    ];
}

export default Validator;
