function* walk(node: Node | null): Generator<Node> {
  if (!node) return;
  yield node;
  yield* walk(node.firstChild);
  yield* walk(node.nextSibling);
}
export default class RapidReading {
  spans: HTMLSpanElement[] = [];
  constructor(node: Node) {
    for (const currNode of walk(node)) {
      if (currNode.nodeType === Node.TEXT_NODE) {
        for (const c of [...(currNode.textContent || '')].filter(e =>
          /\S/.test(e)
        )) {
          const span = document.createElement('span');
          span.textContent = c;
          this.spans.push(span);
        }
        console.log(currNode.textContent);
      }
    }
  }
}
