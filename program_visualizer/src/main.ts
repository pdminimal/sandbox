// import {Interpreter} from '../interpreter';

const binarySearch = `def binary_search(a, val):
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

const src = document.getElementById('src');
if (src) {
  src.textContent = binarySearch;
}
