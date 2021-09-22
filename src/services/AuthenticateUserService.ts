import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if(!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }
// parei aqui: 47:13
    const token = sign(
    {
      email: user.email
    }, 
    '317de995bae421e8e3cf819542b9e4fc', 
    {
      subject: user.id,
      expiresIn: '1d',
    })

    return token;
  }
}

export { AuthenticateUserService }