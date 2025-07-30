import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInputInterface } from '../../application/use-cases/create-user/create-user.use-case';

export class CreateUserDto implements CreateUserInputInterface {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString({ message: 'name deve ser do tipo string' })
  @IsNotEmpty({ message: 'Nome deve ser preenchido' })
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
  name: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail({}, { message: 'Insira um email válido' })
  @IsNotEmpty({ message: 'O email deve ser preenchido' })
  email: string;
}
