parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"jP6t":[function(require,module,exports) {
var n="def binary_search(a, val):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        else:\n            if val < a[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n\n    return -1\n\nbinary_search([-5, 1, 3, 4, 5, 7, 18, 19], 7)",i=[[["[-5, 1, 3, 4, 5, 7, 18, 19], 7)","a=[-5, 1, 3, 4, 5, 7, 18, 19], val=7):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        else:\n            if val < a[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n\n    return -1\n"]],[["len(a)","8"]],[["8 - 1","7"]],[["l <=","0 <="]],[["<= r","<= 7"]],[["0 <= 7","true"]],[["\n    while true:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        else:\n            if val < a[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n","\n    mid = (l + r) // 2\n    if a[mid] == val:\n        return mid\n    else:\n        if val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n"]],[["l + r","0 + 7"]],[["(0 + 7)","7"]],[["7 // 2","3"]],[["a[mid] ==","a[3] =="]],[["a[3]","4"]],[["== val","== 7"]],[["4 == 7","false"]],[["\n    if false:\n        return mid\n    else:\n        if val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    if val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"]],[["val <","7 <"]],[["a[mid]","a[3]"]],[["a[3]","4"]],[["7 < 4","false"]],[["\n    if false:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    l = mid + 1\n"]],[["mid + 1","3 + 1"]],[["3 + 1","4"]],[["    l = 0\n",""]],[["\n    mid = 3\n    l = 4\n","    mid = 3\n    l = 4\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        else:\n            if val < a[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n"]],[["l <=","4 <="]],[["<= r","<= 7"]],[["4 <= 7","true"]],[["\n    while true:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        else:\n            if val < a[mid]:\n                r = mid - 1\n            else:\n                l = mid + 1\n","\n    mid = (l + r) // 2\n    if a[mid] == val:\n        return mid\n    else:\n        if val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n"]],[["l + r","4 + 7"]],[["(4 + 7)","11"]],[["11 // 2","5"],["    mid = 3\n",""]],[["a[mid] ==","a[5] =="]],[["a[5]","7"]],[["== val","== 7"]],[["7 == 7","true"]],[["\n    if true:\n        return mid\n    else:\n        if val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    return mid\n"]],[["return mid","return 5"]]],e=document.getElementById("src");if(e){e.textContent=n;var l=0,r=function r(){var m=i[l];1===l&&(n=n.slice(283));for(var d=0;d<m.length;d++)n=n.replace(m[d][0],m[d][1]);e.textContent=n,(l+=1)<i.length&&setTimeout(r,1e3)};setTimeout(r,1e3)}
},{}]},{},["jP6t"], null)