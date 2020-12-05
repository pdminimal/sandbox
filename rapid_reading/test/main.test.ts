describe('test', () => {
  beforeEach(() => {});

  test('test dom', () => {
    document.body.innerHTML = `
    <section><h1 id="title">title</h1></section>
    `;
    expect(document.getElementById('title')!.textContent).toEqual('title');
  });
});
