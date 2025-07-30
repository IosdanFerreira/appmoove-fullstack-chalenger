import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetUserByEmailDto {
  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail({}, { message: 'Insira um email válido' })
  @IsNotEmpty({ message: 'O email deve ser preenchido' })
  email: string;
}
