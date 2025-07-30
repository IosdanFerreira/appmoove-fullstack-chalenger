import { v4 as uuidv4 } from 'uuid';

/**
 * Classe abstrata base para entidades do sistema.
 * Fornece um identificador único e propriedades imutáveis.
 *
 * @template Props - Tipo das propriedades específicas da entidade.
 */
export abstract class Entity<Props = any> {
  private readonly _id: string;

  protected constructor(
    id: string | undefined,
    public readonly props: Props,
  ) {
    this._id = id ?? uuidv4(); // Usa o id se fornecido, senão gera novo UUID
  }

  /**
   * Retorna o identificador único da entidade.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Retorna a entidade em formato JSON.
   */
  toJSON(): Record<string, any> {
    return {
      id: this._id,
      ...this.props,
    };
  }
}
