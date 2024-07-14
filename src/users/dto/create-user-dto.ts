import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.model';
import { User } from '../users.model';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'E-mail' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '321352646234', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Must be between 4 and 16 characters' })
  readonly password: string;
}

export class UserJwtDto {
  readonly email: string;
  readonly id: number;
  readonly roles: Role[];

  constructor(user: User) {
    this.email = user.email;
    this.id = user.id;
    this.roles = user.roles;
  }
}
