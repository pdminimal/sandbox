export class Quiz {
  sentence: string;
  characterDoms: HTMLSpanElement[];
  segmentDoms: HTMLSpanElement[];
  doms: HTMLSpanElement[];
  segments: number[][];
  current: number;

  constructor(sentence: string) {
    this.sentence = sentence;
    this.current = 0;

    this.characterDoms = [];
    for (const char of sentence) {
      const span = document.createElement('span');
      span.textContent = char;
      this.characterDoms.push(span);
    }

    this.segments = [];
    this.segmentDoms = [];
    this.doms = [];
    const wordsRegex = /[a-z0-9]+/gi;
    let matches = wordsRegex.exec(sentence);
    let prev = 0;
    let cnt = 0;
    while (matches) {
      const end = matches[0].length + matches.index;
      if (cnt % 2) {
        const span = document.createElement('span');
        this.segmentDoms.push(span);  
        this.segments.push([matches.index, end]);
        this.doms.push(...this.characterDoms.slice(prev, matches.index));
        this.doms.push(span);
        span.append(...this.characterDoms.slice(matches.index, end));
      } else {
        this.doms.push(...this.characterDoms.slice(prev, end));
      }


      prev = end;
      matches = wordsRegex.exec(sentence);
      cnt += 1
    }

    this.doms.push(
      ...this.characterDoms.slice(prev, this.characterDoms.length)
    );
  }

  getSegmentText() {
    if (this.current < this.segments.length) {
      const currentSeg = this.segments[this.current];
      return this.sentence.slice(currentSeg[0], currentSeg[1]);
    }
    return '';
  }

  getCharDoms() {
    if (this.current < this.segments.length) {
      const currentSeg = this.segments[this.current];
      return this.characterDoms.slice(currentSeg[0], currentSeg[1]);
    }
    return [];
  }

  getSegmentDom() {
    return this.segmentDoms[this.current];
  }

  next() {
    this.current += 1;
    if (this.current < this.segments.length) {
      return this.segments[this.current];
    }
    return false;
  }

  judge(challengeText: string) {
    return this.getSegmentText()
      .toLocaleLowerCase()
      .startsWith(challengeText.toLocaleLowerCase());
  }
}
