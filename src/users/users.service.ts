import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('====================================');
        console.log(`DATABASE ERROR => ${error.code}`);
        console.log(`DATABASE MESSAGE => ${error.message}`);
        console.log('====================================');

        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `might be possible {email} or {phone} already exist!`,
          );
        }

        throw new ForbiddenException(`something went wrong on create user!`);
      }

      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('====================================');
        console.log(`DATABASE ERROR => ${error.code}`);
        console.log(`DATABASE MESSAGE => ${error.message}`);
        console.log('====================================');

        throw new ForbiddenException(`something went wrong on get users!`);
      }

      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('====================================');
        console.log(`DATABASE ERROR => ${error.code}`);
        console.log(`DATABASE MESSAGE => ${error.message}`);
        console.log('====================================');

        if (error.code === 'P2025') {
          throw new ForbiddenException(`Invalid user {id}!`);
        }

        throw new ForbiddenException(`something went wrong on find user!`);
      }

      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('====================================');
        console.log(`DATABASE ERROR => ${error.code}`);
        console.log(`DATABASE MESSAGE => ${error.message}`);
        console.log('====================================');

        if (error.code === 'P2025') {
          throw new ForbiddenException(`Invalid user {id}!`);
        }

        throw new ForbiddenException(`something went wrong on update user!`);
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log('====================================');
        console.log(`DATABASE ERROR => ${error.code}`);
        console.log(`DATABASE MESSAGE => ${error.message}`);
        console.log('====================================');

        if (error.code === 'P2025') {
          throw new ForbiddenException(`Invalid user {id}!`);
        }

        throw new ForbiddenException(`something went wrong on delete user!`);
      }

      throw error;
    }
  }
}
