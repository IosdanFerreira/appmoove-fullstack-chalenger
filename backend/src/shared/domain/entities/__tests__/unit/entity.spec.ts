import { Entity } from '../../entity';

interface StubEntityProps {
  test1: string;
  test2: string;
}

class StubEntity extends Entity<StubEntityProps> {
  constructor(props: StubEntityProps, id?: string) {
    super(id, props);
  }
}

describe('Entity unit tests', () => {
  let input: StubEntityProps;

  beforeEach(() => {
    input = {
      test1: 'test1',
      test2: 'test2',
    };
  });

  it('deve criar uma entidade com id fornecido', () => {
    const id = '1234-5678';
    const entity = new StubEntity(input, id);

    expect(entity.id).toBe(id);
    expect(entity.props.test1).toBe('test1');
    expect(entity.props.test2).toBe('test2');
  });

  it('deve criar uma entidade com id gerado automaticamente', () => {
    const entity = new StubEntity(input);

    expect(entity.id).toBeDefined();
    expect(typeof entity.id).toBe('string');
    expect(entity.id).toHaveLength(36);
    expect(entity.props.test1).toBe('test1');
    expect(entity.props.test2).toBe('test2');
  });

  it('toJSON deve retornar id e todas as propriedades', () => {
    const id = 'uuid-test-1234';
    const entity = new StubEntity(input, id);

    const json = entity.toJSON();
    expect(json).toEqual({
      id,
      test1: 'test1',
      test2: 'test2',
    });
  });

  it('deve criar entidades diferentes com propriedades diferentes', () => {
    const entity1 = new StubEntity({ test1: 'a', test2: 'b' });
    const entity2 = new StubEntity({ test1: 'c', test2: 'd' });

    expect(entity1.props.test1).toBe('a');
    expect(entity2.props.test1).toBe('c');
    expect(entity1.id).not.toBe(entity2.id);
  });
});
