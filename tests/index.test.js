const safelyRead = require('../index');

describe('safelyRead core', () => {
  const fakeObj = {
    batman: {
      aka: 'Bruce Wayne',
      car: 'Batmobil',
      villain: 'Joker',
      related: {
        heroes: ['Superman', 'Flash', 'Wonder-Woman'],
      },
    },
  };

  it('should be defined', () => {
    expect(safelyRead).toBeDefined();
    expect(typeof safelyRead).toBe('function');
  });

  it('should navigate into the path given', () => {
    const resultAka = safelyRead(fakeObj, ['batman', 'aka'], 'Not found');
    expect(resultAka).toEqual(fakeObj.batman.aka);

    const resultRelated = safelyRead(fakeObj, ['batman', 'related', 'heroes'], []);
    expect(resultRelated).toEqual(fakeObj.batman.related.heroes);
  });

  it('should return the fallback when path doesn`t exist', () => {
    const resultAka = safelyRead(fakeObj, ['batman', 'idetity'], 'Not found');
    expect(resultAka).toEqual('Not found');

    const resultRelated = safelyRead(fakeObj, ['batman', 'related', 'dcHeroes'], []);
    expect(resultRelated).toEqual([]);
  });

  it('should apply the transform function in the result', () => {
    const resultAka = safelyRead(
      fakeObj,
      ['batman', 'aka'],
      'Not found',
      (aka) => `Batman's real name is ${aka}`
    );
    expect(resultAka).toEqual(`Batman's real name is ${fakeObj.batman.aka}`);
  });

  it('should crash if called with a non-function transform ', () => {
    expect(
      safelyRead(fakeObj, ['batman', 'aka'], null, 'hello'),
    ).toBe('Bruce Wayne');

    expect(
      safelyRead(fakeObj, ['batman', 'dcHeroes'], null, 'hello'),
    ).toBeNull();
  });

  it('should call console.error on dev mode if transform function crash', () => {
    process.env.NODE_ENV = 'development';

    const mockConsole = jest.spyOn(console, 'error');
    safelyRead(
      fakeObj,
      ['batman', 'aka'],
      null,
      () => { throw new Error('for test'); },
    );
    expect(mockConsole).toHaveBeenCalledTimes(1);
  });

  it('should return the result if transform function crash and dev mode is not running', () => {
    process.env.NODE_ENV = 'prod';
    const mockConsole = jest.spyOn(console, 'error');

    const result = safelyRead(
      fakeObj,
      ['batman', 'aka'],
      null,
      () => { throw new Error('for test'); },
    );

    expect(result).toEqual(fakeObj.batman.aka);
  });
});