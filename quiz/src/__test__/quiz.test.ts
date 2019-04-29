import { Quiz } from '../quiz';

describe('test quiz', () => {
  it('should make doms', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.characterDoms.length).toBe(sentence.length);
  });

  it('should make words', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.segments.length).toBe(sentence.split(' ').length);
    expect(quiz.segments[0]).toEqual([0, 2]);
    expect(quiz.segments[1]).toEqual([3, 9]);
  });

  it('should return next words', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.next()).toEqual([3, 9]);
    expect(quiz.next()).toEqual([10, 12]);
    expect(quiz.next()).toEqual([13, 14]);
    expect(quiz.next()).toEqual([15, 19]);
    expect(quiz.next()).toBe(false);
  });

  it('should judge correct or not', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.judge('i')).toBe(true);
    expect(quiz.judge('t')).toBe(false);
    quiz.next();
    expect(quiz.judge('i')).toBe(false);
    expect(quiz.judge('S')).toBe(true);
    while (quiz.next()) {}
    expect(quiz.judge('i')).toBe(false);
  });

  it('should return charactor doms', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.getCharDoms().length).toBe(2);
    expect(quiz.getCharDoms()[0].textContent).toBe('i');
    while (quiz.next()) {}
    expect(quiz.getCharDoms()).toEqual([]);
  });

  it('should return segmentation doms', () => {
    const sentence = 'it should be a test.';
    const quiz = new Quiz(sentence);
    expect(quiz.getCharDoms().length).toBe(2);
    expect(quiz.getCharDoms()[0].textContent).toBe('i');
    expect(quiz.getSegmentDom().firstChild).toBe(quiz.getCharDoms()[0]);
  });
});
