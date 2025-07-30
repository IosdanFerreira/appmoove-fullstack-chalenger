import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/shared/infra/presenters/base-response.presenter';
import { MetaInterface } from 'src/shared/application/interfaces/meta.interface';
import { MetaPresenter } from 'src/shared/infra/presenters/paginations.presenter';
import { Transform } from 'class-transformer';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserPresenter {
  @ApiProperty({ description: 'Identificação do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ description: 'Data de criação do usuário' })
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  /**
   * Construtor da classe UserPresenter.
   * @param userDto Dados do usuário obtidos da camada de negócios.
   */
  constructor(userDto: ReturnType<UserEntity['toJSON']>) {
    /**
     * Identificação do usuário.
     */
    this.id = userDto.id;

    /**
     * Nome do usuário.
     */
    this.name = userDto.name;

    /**
     * E-mail do usuário.
     */
    this.email = userDto.email;

    /**
     * Data de criação do usuário.
     */
    this.createdAt = userDto.createdAt;
  }

  /**
   * Construtor da classe UserPresenter.
   * @param userDto Dados do usuário obtidos da camada de negócios.
   */
  static present(
    userDto: ReturnType<UserEntity['toJSON']>,
    statusCode: number,
    message: string,
  ) {
    /**
     * Retorna uma resposta HTTP com dados do usuário.
     * @param userDto Dados do usuário obtidos da camada de negócios.
     * @param statusCode Código de status HTTP.
     * @param message Mensagem de sucesso.
     * @returns Uma resposta HTTP com dados do usuário.
     */
    return BaseResponse.success(
      new UserPresenter(userDto),
      statusCode,
      message,
    );
  }
}

export class UserCollectionPresenter {
  /**
   * Retorna uma resposta HTTP com dados de usuários.
   * @param items Dados dos usuários obtidos da camada de negócios.
   * @param statusCode Código de status HTTP.
   * @param meta Dados de paginação.
   * @param message Mensagem de sucesso.
   * @returns Uma resposta HTTP com dados de usuários.
   */
  static present(
    items: ReturnType<UserEntity['toJSON']>[],
    statusCode: number,
    meta: MetaInterface,
    message: string,
  ) {
    return BaseResponse.success(
      items.map((item) => new UserPresenter(item)),
      statusCode,
      message,
      new MetaPresenter(meta),
    );
  }
}
