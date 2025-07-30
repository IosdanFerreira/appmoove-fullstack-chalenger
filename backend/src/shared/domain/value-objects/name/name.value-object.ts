import { InvalidParamError } from '../../errors/invalid-param.error';

/**
 * Value Object que representa um Nome.
 *
 * Esta classe garante que o nome seja:
 * - Uma string não vazia;
 * - Tenha pelo menos 3 caracteres por palavra;
 * - Cada palavra comece com letra maiúscula (suporte a acentos);
 * - Imutável após criação.
 */
export class Name {
  private readonly _value: string;

  private constructor(name: string) {
    this._value = name;
  }

  /**
   * Cria uma nova instância de `Name`, validando o valor fornecido.
   *
   * - Remove espaços extras.
   * - Valida se o valor não está vazio, é string e segue o padrão esperado.
   * - Regex permite letras com acentos e múltiplos nomes (e.g. "José da Silva").
   *
   * @param name - Nome a ser validado.
   * @throws {InvalidParamError} Caso o nome seja inválido, vazio ou não seja string.
   * @returns Uma nova instância imutável de `Name`.
   */
  static create(name: string): Name {
    // Regex: cada palavra deve começar com letra maiúscula (incluindo acentos),
    // seguida de pelo menos 2 caracteres minúsculos (com suporte a acentos).
    const nameRegex = /^([A-ZÀ-Ý][a-zà-ÿ']{2,})(?:\s[A-ZÀ-Ý][a-zà-ÿ']{2,})*$/;

    if (!name) {
      throw new InvalidParamError('Nome é obrigatório', [
        { property: 'name', message: 'Nome deve ser preenchido' },
      ]);
    }

    if (typeof name !== 'string') {
      throw new InvalidParamError('Nome deve ser do tipo string', [
        { property: 'name', message: 'Nome deve ser do tipo string' },
      ]);
    }

    const nameTrimmed = name.trim();

    if (!nameRegex.test(nameTrimmed)) {
      throw new InvalidParamError('Nome com formato inválido', [
        {
          property: 'name',
          message:
            'O nome deve conter pelo menos 3 caracteres e a primeira letra maiúscula',
        },
      ]);
    }

    return new Name(nameTrimmed);
  }

  /**
   * Retorna o valor do nome.
   *
   * @returns Nome validado como string.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Compara igualdade entre dois nomes.
   *
   * @param other - Outro objeto `Name` a ser comparado.
   * @returns `true` se os nomes forem iguais; `false` caso contrário.
   */
  equals(other: Name): boolean {
    return other instanceof Name && this._value === other.value;
  }
}
