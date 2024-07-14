import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'E-mail' })
  readonly email: string;

  @ApiProperty({ example: '321352646234', description: 'Password' })
  readonly password: string;
}
