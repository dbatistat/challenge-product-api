import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import {
  ChangePassword,
  CreateUser,
  ExistUser,
  FindUser,
  UpdateUser,
} from './user.interfaces'
import { encryptPassword } from '../util/utils'
import { FindUserNotExistException } from './exceptions/find-user-not-exist.exception'
import { UserNotExistException } from './exceptions/user-not-exist.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id })
  }

  findUser({ username, email, token }: FindUser): Promise<User | undefined> {
    const where = []
    if (username) where.push({ username })
    if (email) where.push({ email })
    if (token) where.push({ recoverPassword: token })

    return this.usersRepository.findOne({
      where,
    })
  }

  existLoggedUser({
    username,
    password,
  }: ExistUser): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username, password },
    })
  }

  async create(createUser: CreateUser): Promise<User> {
    const existUser = await this.findUser({
      username: createUser.username,
      email: createUser.email,
    })

    if (existUser !== null) {
      throw new FindUserNotExistException()
    }

    const { password, ...rest } = createUser
    const passwordEncrypted = encryptPassword(password)
    return this.usersRepository.save({ ...rest, password: passwordEncrypted })
  }

  async update(id: number, updateUser: UpdateUser): Promise<User> {
    const existUser = await this.usersRepository.findOne({
      where: {
        id,
      },
    })

    if (existUser == null) {
      throw new UserNotExistException()
    }

    const userUpdated = await this.usersRepository.save({
      ...existUser,
      ...(updateUser.password && {
        password: encryptPassword(updateUser.password),
      }),
      recoverPassword: updateUser.recoverPassword,
    })

    return userUpdated
  }

  async changePassword(
    id: number,
    changePassword: ChangePassword,
  ): Promise<User> {
    console.log({ id, changePassword })
    const existUser = await this.usersRepository.findOne({
      where: {
        id,
        password: encryptPassword(changePassword.currentPassword),
      },
    })

    if (existUser == null) {
      throw new UserNotExistException()
    }

    const userUpdated = await this.usersRepository.save({
      ...existUser,
      password: encryptPassword(changePassword.newPassword),
    })

    return userUpdated
  }
}
