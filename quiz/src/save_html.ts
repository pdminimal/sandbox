import * as puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 749});
  const args = process.argv.slice(2);
  await page.goto(args[0]);

  const html = await page.evaluate(() => {
    const CSS_PROPERTIES = [
      'align-items',
      'background-',
      'border-',
      'bottom',
      'box-',
      'color',
      'display',
      'direction',
      'flex',
      'float',
      'font-',
      'height',
      'justify-content',
      'left',
      'letter-',
      'line-',
      'list-style',
      'margin-',
      'max-',
      'min-',
      'outline',
      'overflow',
      'padding-',
      'position',
      'right',
      'text-',
      'top',
      'vertical-align',
      'visibility',
      'white-space',
      'width',
      'z-index'
    ];
    const INHERITED_PROPERTIES =
        ['color', 'font-', 'letter-', 'list-style', 'text-align'];
    class TagComponent {
      children: TagComponent[] = [];
      name = '';
      text = '';
      parent: TagComponent|null;
      styles: {[x: string]: string;} = {};
      attributes: {[x: string]: string;} = {};
      constructor(name: string, parent = null) {
        this.name = name ? name.toLowerCase() : name;
        this.parent = parent;
      }
      toHtml() {
        const styleAttrValue = '';
        const attrs: string[] = [];
        const attrsKeys = Object.keys(this.attributes);
        for (let i = 0; i < attrsKeys.length; i += 1) {
          const attr = attrsKeys[i];
          if (this.attributes[attr] != null) {
            const attrValue = this.attributes[attr].replace(/"/g, '\'');
            if (attr !== 'style' && attr !== 'srcset') {
              attrs.push(`${attr}="${attrValue}"`);
            }
          }
        }
        const styles: string[] = [];
        const styleKeys = Object.keys(this.styles);
        for (let i = 0; i < styleKeys.length; i += 1) {
          const style = styleKeys[i];
          if (this.styles[style] != null) {
            const styleValue = this.styles[style].replace(/"/g, '\'');
            if (styleValue) {
              styles.push(`${style}:${styleValue};`);
            }
          }
        }
        const styleAttr = styles.length ? ` style="${styles.join('')}"` : '';
        const attributes = attrs.length ? ' ' + attrs.join(' ') : '';
        const openTag = `<${this.name}${attributes}${styleAttr}>`;
        const closeTag = `</${this.name}>`;
        const contents = [];
        this.children.forEach(child => {
          if (child.name) {
            if (!['script', 'style'].includes(child.name)) {
              contents.push(child.toHtml());
            }
          } else {
            const inner = document.createElement('span');
            inner.textContent = child.text;
            contents.push(inner.innerHTML);
            inner.remove();
          }
        });
        const content = contents.join('');
        return `${openTag}${content}${closeTag}`;
      }
    }
    const root = new TagComponent('html');
    function walkDOM(parentTag: TagComponent, node: Element) {
      let childnode = node.firstChild as Element;
      while (childnode) {
        const newParent = makeTree(parentTag, childnode);

        walkDOM(newParent, childnode);
        childnode = childnode.nextSibling as Element;
      }
    }

    function makeTree(parentTag: TagComponent, child: Element) {
      const ret = new TagComponent(child.tagName);
      if (child.tagName) {
        const styles = window.getComputedStyle(child, null);
        for (let i = 0; i < styles.length; i++) {
          const style = styles[i];
          for (const property of CSS_PROPERTIES) {
            if (style.startsWith(property)) {
              let inherit = false;
              for (const inherited of INHERITED_PROPERTIES) {
                if (style.startsWith(inherited)) {
                  inherit = true;
                  break;
                }
              }
              if (inherit) {
                let tmpParent = parentTag;
                while (tmpParent) {
                  if (tmpParent.styles[style]) {
                    break;
                  }
                  tmpParent = tmpParent.parent;
                }
                if (!tmpParent || tmpParent.styles[style] !== styles[style]) {
                  ret.styles[style] = styles[style];
                }
              } else {
                ret.styles[style] = styles[style];
              }


              break;
            }
          }
        }
        const attrs = child.attributes;
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i].name;
          let value = attrs[i].value;
          if (attr === 'src' || attr === 'href') {
            if (value.startsWith('//')) {
              value = 'https:' + value;
            } else if (value.startsWith('/')) {
              value = `https://${location.hostname}` + value;
            }
          }
          ret.attributes[attr] = value;
        }
      } else if (child.nodeType === 3) {
        ret.text = child.textContent;
      }
      parentTag.children.push(ret);
      return ret;
    }

    walkDOM(root, document.documentElement);
    return root.toHtml();
  });

  console.log(html);
  await browser.close();
})();
