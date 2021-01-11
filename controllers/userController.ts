import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
// import passport from 'passport';
// import LocalStrategy from 'passport-local';
import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { IUser } from '../models/user';

class UserController {
  public prisma: PrismaClient = new PrismaClient();

  /**
   * Register user and return user object
   * @param req: Http request
   * @param res; Http response
   */
  public async registerUser(req: Request, res: Response): Promise<void> {
    const user:IUser = {
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
    };

    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const existingUser = await this.findUserByEmail(user.email);

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          username: user.username,
          password: hashedPassword,
        },
      });
      res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      });
    }
  }

  public async authenticateUser(req: Request, res: Response) {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    this.findUserByEmail(user.email).then(async (result) => {
      if (result) {
        const isCorrectPassword = bcrypt.compareSync(user.password, result?.password);
        console.log(isCorrectPassword);
        if (isCorrectPassword === true) {
          const email = result?.email;
          const token = jwt.sign({ email }, config.JWT_SECRET, {
            expiresIn: 100000,
          });
          delete user.password;
          const response = { email: user.email, username: result.username, ...{ token } };

          return res.status(200).json(response);
        }
      }
      return res.status(404).json({ error: 'Wrong username or password' });
    });
  }

  /**
   * Find user by email
   * @param userEmail: User's email
   */
  public async findUserByEmail(userEmail: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        name: true, email: true, username: true, password: true,
      },
      where: { email: userEmail },
    });
    return user || false;
  }

  private async comparePassword(password: string, userPassword: string) {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    if (hashedPassword === userPassword) {
      console.log({ hashed: hashedPassword, pwd: password });
      return true;
    }
    return false;
  }
}

export default UserController;
