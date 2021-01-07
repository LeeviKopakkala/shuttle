import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
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

  /**
   * Find user by email
   * @param userEmail: User's email
   */
  public async findUserByEmail(userEmail: string) {
    const user = await this.prisma.user.findUnique({
      select: { name: true, email: true },
      where: { email: userEmail },
    });
    return user || false;
  }
}

export default UserController;
