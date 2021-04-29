import RapidReading from '../src/main';

describe('test RapidReading', () => {
  beforeEach(() => {});

  test('test split dom', () => {
    document.body.innerHTML = '<section><h1 id="title">title</h1></section>';
    const rr = new RapidReading(document.body);
    expect(rr.spans.length).toEqual(5);
  });
});
