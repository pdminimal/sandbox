function* walk(node: Node | null): Generator<Node> {
  if (!node) return;
  yield node;
  yield* walk(node.firstChild);
  yield* walk(node.nextSibling);
}
export default class RapidReading {
  spans: HTMLSpanElement[] = [];

  constructor(node: Node) {
    const nodes: Node[] = [];
    for (const currNode of walk(node)) {
      nodes.push(currNode);
    }

    for (const currNode of nodes) {
      const parentNode = currNode.parentNode!;
      if (currNode.nodeType === Node.TEXT_NODE) {
        for (const c of [...(currNode.textContent || '')]) {
          const span = document.createElement('span');
          span.classList.add('_rr');
          span.classList.add('pale');
          span.textContent = c;
          this.spans.push(span);
          parentNode.insertBefore(span, currNode);
        }
        const span = document.createElement('span');
        span.classList.add('_rr');
        span.classList.add('hidden');
        parentNode.insertBefore(span, currNode);
        span.append(currNode);
      }
    }
  }
}
