// import {Interpreter} from '../interpreter';

const binarySearchOrig = `def binary_search(a, val):
    l = 0
    r = len(a) - 1

    while l <= r:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1

    return -1

binary_search([-5, 1, 3, 4, 5, 7, 18, 19], 7)`;

const replaces = [
  [
    '[-5, 1, 3, 4, 5, 7, 18, 19], 7)', `a=[-5, 1, 3, 4, 5, 7, 18, 19], val=7):
    l = 0
    r = len(a) - 1

    while l <= r:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1

    return -1
`
  ],
  ['len(a)', '8', 'a=[-5, 1, 3, 4, 5, 7, 18, 19]'],
  ['8 - 1', '7'],
  ['l <=', '{{0}} <=', 'l = 0'],
  ['<= r', '<= {{7}}', 'r = 7'],
  ['0 <= 7', 'True'],
  [
    `
    while True:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    while True:
{{        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
}}`
  ],
  [
    `
    while True:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    mid = (l + r) // 2
    if val == a[mid]:
        return mid
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`
  ],
  ['l + r', '{{0}} + r', 'l = 0'],
  ['0 + r', '0 + {{7}}', 'r = 7'],
  ['(0 + 7)', '7'],
  ['7 // 2', '3'],
  ['\n    mid = 3', '    mid = 3\n'],
  ['val ==', '{{7}} ==', 'val=7'],
  ['== a[mid]', '== a[{{3}}]', 'mid = 3'],
  ['a[3]', '4', ' 4'],
  ['7 == 4', 'False'],
  [
    `
    if False:
        return mid
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    if False:
        return mid
{{    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
}}`
  ],
  [
    `
    if False:
        return mid
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`
  ],
  ['val <', '{{7}} <', 'val=7'],
  ['a[mid]', 'a[{{3}}]', 'mid = 3'],
  ['a[3]', '4', ' 4'],
  ['7 < 4', 'False'],
  [
    `
    elif False:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    elif False:
        r = mid - 1
    else:
{{        l = mid + 1
}}`
  ],
  [
    `
    elif False:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    l = mid + 1
`
  ],
  ['mid + 1', '{{3}} + 1', 'mid = 3'],
  ['3 + 1', '{{4}}'],
  ['    l = 0', '    l = 4'],
  ['3\n\n    l = 4', '3{{}}'],
  [
    `3

`,
    `3{{

    while l <= r:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
}}
`
  ],
  ['l <=', '{{4}} <=', 'l = 4'],
  ['<= r', '<= {{7}}', 'r = 7'],
  ['4 <= 7', 'True'],
  [
    `
    while True:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    while True:
{{        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
}}`
  ],
  [
    `
    while True:
        mid = (l + r) // 2
        if val == a[mid]:
            return mid
        elif val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    mid = (l + r) // 2
    if val == a[mid]:
        return mid
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`
  ],

  ['l + r', '{{4}} + r', 'l = 4'],
  ['4 + r', '4 + {{7}}', 'r = 7'],
  ['(4 + 7)', '11'],
  ['11 // 2', '5'],
  ['    mid = 3\n', '    mid = 5\n'],
  ['    mid = 5\n\n    mid = 5', '    mid = 5\n'],
  ['val ==', '{{7}} ==', 'val=7'],
  ['== a[mid]', '== a[{{5}}]', 'mid = 5'],
  ['a[5]', '7', ' 7'],
  ['7 == 7', 'True'],
  [
    `
    if True:
        return mid
`,
    `
    if True:
{{        return mid
}}`
  ],
  [
    `
    if True:
        return mid
    elif val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    return mid
`
  ],
  ['return mid', 'return {{5}}', 'mid = 5'],
  [],
];

const src = document.getElementById('src')!;
const startButton = document.getElementById('start');
if (src && startButton) {
  src.textContent = binarySearchOrig;
  startButton.addEventListener('click', startAnimation);
}
let timer: number;
function startAnimation() {
  src.textContent = binarySearchOrig;
  const memo: {[key: number]: string;} = {};
  let i = 0;
  const prefix = binarySearchOrig.slice(0, 256);
  const getNthSource = (j: number) => {
    let binarySearch = binarySearchOrig;
    if (j in memo) {
      return memo[j];
    }
    for (let i = 0; i <= j; i++) {
      if (i in memo) {
        binarySearch = memo[i];
        if (i < j) {
          binarySearch = binarySearch.replace(/\{\{|\}\}|\{\%|\%\}/g, '');
        }
        continue;
      }
      const curReplace = replaces[i];
      if (i === 0) {
        binarySearch = binarySearch.slice(256);
      } else if (i === replaces.length - 1) {
        binarySearch = '{{5}}';
      }
      if (curReplace.length) {
        let replace = curReplace[1];
        if (replace.indexOf('{{') < 0) {
          replace = '{{' + replace + '}}';
        }
        binarySearch = binarySearch.replace(curReplace[0], replace);
        if (curReplace.length > 2) {
          binarySearch =
              binarySearch.replace(curReplace[2], '{%' + curReplace[2] + '%}');
        }
      }
      memo[i] = binarySearch;

      if (i < j) {
        binarySearch = binarySearch.replace(/\{\{|\}\}|\{\%|\%\}/g, '');
      }
    }
    return binarySearch;
  };
  const step = () => {
    const spans: HTMLSpanElement[] = [];
    const srcText = prefix + getNthSource(i);
    let index = srcText.search(/\{\{|\{[%]/);
    let start = 0;
    while (index >= start) {
      const startStr = srcText.slice(index, index + 2);
      const endStr = startStr === '{{' ? '}}' : '%}';
      let span = document.createElement('span');
      span.textContent = srcText.slice(start, index);
      spans.push(span);
      const end = srcText.indexOf(endStr, index + 2);
      span = document.createElement('span');
      span.textContent = srcText.slice(index + 2, end);
      span.classList.add(startStr === '{{' ? 'emphasized' : 'd-def');
      spans.push(span);
      start = end + 2;
      index = srcText.slice(start).search(/\{\{|\{[%]/) + start;
    }
    const span = document.createElement('span');
    span.textContent = srcText.slice(start);
    spans.push(span);
    while (src.firstChild) {
      src.firstChild.remove();
    }
    spans.forEach(element => {
      src.appendChild(element);
    });

    setTimeout(() => {
      spans.forEach(element => {
        if (element.classList.contains('d-def')) {
          element.classList.remove('d-def');
          element.classList.add('def');
        }
      });
    });

    i += 1;
    if (i < replaces.length) {
      timer = setTimeout(step, 1500);
    }
  };

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(step, 1500);
}
