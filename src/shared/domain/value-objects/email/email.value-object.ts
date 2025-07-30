import { InvalidParamError } from '../../errors/invalid-param.error';

/**
 * Value Object que representa um endereço de email.
 *
 * Essa classe é imutável, garantindo que o email armazenado seja sempre válido,
 * normalizado e não possa ser alterado após a criação.
 */
export class Email {
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email;
  }

  /**
   * Cria um novo objeto `Email`, validando e normalizando o valor fornecido.
   *
   * - Remove espaços extras.
   * - Converte para letras minúsculas (emails não diferenciam maiúsculas/minúsculas).
   * - Valida o formato do email com uma expressão regular.
   *
   * @param email - Endereço de email a ser validado.
   * @throws {InvalidParamError} Se o email estiver vazio, não for string ou tiver formato inválido.
   * @returns Uma nova instância imutável de `Email`.
   */
  static create(email: string): Email {
    if (!email) {
      throw new InvalidParamError('Email é obrigatório');
    }

    if (typeof email !== 'string') {
      throw new InvalidParamError('Email deve ser do tipo string');
    }

    const emailTrimmed = email.trim().toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailTrimmed)) {
      throw new InvalidParamError('Email com formato inválido');
    }

    return new Email(emailTrimmed);
  }

  /**
   * Retorna o valor normalizado do email.
   *
   * @returns O endereço de email em formato `string`.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Compara igualdade entre dois objetos `Email`.
   *
   * @param other - Outro objeto `Email` a ser comparado.
   * @returns `true` se ambos os emails possuírem o mesmo valor, `false` caso contrário.
   */
  equals(other: Email): boolean {
    return other instanceof Email && this._value === other.value;
  }
}
