import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserJwtDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        `User with email "${userDto.email} already exists"`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = new UserJwtDto(user);
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
