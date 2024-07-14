import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/roles.model';
import { User } from '../users.model';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'E-mail' })
  readonly email: string;

  @ApiProperty({ example: '321352646234', description: 'Password' })
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
