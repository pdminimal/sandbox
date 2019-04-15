// import {Interpreter} from '../interpreter';

let binarySearch = `def binary_search(a, val):
    l = 0
    r = len(a) - 1

    while l <= r:
        mid = (l + r) // 2
        if a[mid] == val:
            return mid
        else:
            if val < a[mid]:
                r = mid - 1
            else:
                l = mid + 1

    return -1

binary_search([-5, 1, 3, 4, 5, 7, 18, 19], 7)`;

const replaces = [
  [[
    '[-5, 1, 3, 4, 5, 7, 18, 19], 7)', `a=[-5, 1, 3, 4, 5, 7, 18, 19], val=7):
    l = 0
    r = len(a) - 1

    while l <= r:
        mid = (l + r) // 2
        if a[mid] == val:
            return mid
        else:
            if val < a[mid]:
                r = mid - 1
            else:
                l = mid + 1

    return -1
`
  ]],
  [['len(a)', '8']],
  [['8 - 1', '7']],
  [['l <=', '0 <=']],
  [['<= r', '<= 7']],
  [['0 <= 7', 'true']],
  [[
    `
    while true:
        mid = (l + r) // 2
        if a[mid] == val:
            return mid
        else:
            if val < a[mid]:
                r = mid - 1
            else:
                l = mid + 1
`,
    `
    mid = (l + r) // 2
    if a[mid] == val:
        return mid
    else:
        if val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`
  ]],

  [['l + r', '0 + 7']],
  [['(0 + 7)', '7']],
  [['7 // 2', '3']],
  [['a[mid] ==', 'a[3] ==']],
  [['a[3]', '4']],
  [['== val', '== 7']],
  [['4 == 7', 'false']],
  [[
    `
    if false:
        return mid
    else:
        if val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    if val < a[mid]:
        r = mid - 1
    else:
        l = mid + 1
`
  ]],
  [['val <', '7 <']],
  [['a[mid]', 'a[3]']],
  [['a[3]', '4']],
  [['7 < 4', 'false']],
  [[
    `
    if false:
        r = mid - 1
    else:
        l = mid + 1
`,
    `
    l = mid + 1
`
  ]],
  [['mid + 1', '3 + 1']],
  [['3 + 1', '4']],
  [['    l = 0\n', '']],
  [
    [
      `
    mid = 3
    l = 4
`,
      `    mid = 3
    l = 4

    while l <= r:
        mid = (l + r) // 2
        if a[mid] == val:
            return mid
        else:
            if val < a[mid]:
                r = mid - 1
            else:
                l = mid + 1
`
    ]],
  [['l <=', '4 <=']],
  [['<= r', '<= 7']],
  [['4 <= 7', 'true']],
  [[
    `
    while true:
        mid = (l + r) // 2
        if a[mid] == val:
            return mid
        else:
            if val < a[mid]:
                r = mid - 1
            else:
                l = mid + 1
`,
    `
    mid = (l + r) // 2
    if a[mid] == val:
        return mid
    else:
        if val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`
  ]],

  [['l + r', '4 + 7']],
  [['(4 + 7)', '11']],
  [['11 // 2', '5'], ['    mid = 3\n', '']],
  [['a[mid] ==', 'a[5] ==']],
  [['a[5]', '7']],
  [['== val', '== 7']],
  [['7 == 7', 'true']],
  [[
    `
    if true:
        return mid
    else:
        if val < a[mid]:
            r = mid - 1
        else:
            l = mid + 1
`,
    `
    return mid
`
  ]],
  [['return mid', 'return 5']],

];

const src = document.getElementById('src');
if (src) {
  src.textContent = binarySearch;
  let i = 0;
  const step = () => {
    const curReplace = replaces[i];
    if (i === 1) {
      binarySearch = binarySearch.slice(283);
    }
    for (let j = 0; j < curReplace.length; j++) {
      binarySearch = binarySearch.replace(curReplace[j][0], curReplace[j][1]);
    }
    src.textContent = binarySearch;
    i += 1;
    if (i < replaces.length) {
      setTimeout(step, 1000);
    }
  };
  setTimeout(step, 1000);
}
