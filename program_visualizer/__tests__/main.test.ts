import { Parser } from '../main';

test('initialize parser', () => {
  const parser = new Parser('test');
  expect(parser.src).toBe('test');
});