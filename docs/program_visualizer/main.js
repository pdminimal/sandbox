parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"jP6t":[function(require,module,exports) {
var n="def binary_search(a, val):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n\n    return -1\n\nbinary_search([-5, 1, 3, 4, 5, 7, 18, 19], 7)",e=[["[-5, 1, 3, 4, 5, 7, 18, 19], 7)","a=[-5, 1, 3, 4, 5, 7, 18, 19], val=7):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n\n    return -1\n"],["len(a)","8","a=[-5, 1, 3, 4, 5, 7, 18, 19]"],["8 - 1","7"],["l <=","{{0}} <=","l = 0"],["<= r","<= {{7}}","r = 7"],["0 <= 7","true"],["\n    while true:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    mid = (l + r) // 2\n    if a[mid] == val:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["l + r","{{0}} + r","l = 0"],["0 + r","0 + {{7}}","r = 7"],["(0 + 7)","7"],["7 // 2","3"],["a[mid] ==","a[{{3}}] ==","mid = 3"],["a[3]","4"," 4"],["== val","== {{7}}","val=7"],["4 == 7","false"],["\n    if false:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["val <","{{7}} <","val=7"],["a[mid]","a[{{3}}]","mid = 3"],["a[3]","4"," 4"],["7 < 4","false"],["\n    elif false:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    l = mid + 1\n"],["mid + 1","{{3}} + 1","mid = 3"],["3 + 1","{{4}}"],["    l = 0\n",""],["\n    mid = 3\n    l = 4\n","    mid = 3\n    l = 4\n\n    while l <= r:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n"],["l <=","{{4}} <=","l = 4"],["<= r","<= {{7}}","r = 7"],["4 <= 7","true"],["\n    while true:\n        mid = (l + r) // 2\n        if a[mid] == val:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    mid = (l + r) // 2\n    if a[mid] == val:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["l + r","{{4}} + r","l = 4"],["4 + r","4 + {{7}}","r = 7"],["(4 + 7)","11"],["11 // 2","5"],["    mid = 3\n",""],["a[mid] ==","a[{{5}}] ==","mid = 5"],["a[5]","7"," 7"],["== val","== {{7}}","val=7"],["7 == 7","true"],["\n    if true:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    return mid\n"],["return mid","return {{5}}","mid = 5"],[]],i=document.getElementById("src");if(i){i.textContent=n;var l=0,a=n.slice(0,256),d=function d(){var r=e[l];if(0===l?n=n.slice(256):l===e.length-1&&(n="{{5}}"),r.length){var m=r[1];m.indexOf("{{")<0&&(m="{{"+m+"}}"),n=n.replace(r[0],m),r.length>2&&(n=n.replace(r[2],"{%"+r[2]+"%}"))}for(var t=[],s=a+n,f=s.search(/\{\{|\{[%]/),c=0;f>=c;){var v=s.slice(f,f+2),u="{{"===v?"}}":"%}",h=document.createElement("span");h.textContent=s.slice(c,f),t.push(h);var o=s.indexOf(u,f+2);if((h=document.createElement("span")).textContent=s.slice(f+2,o),h.classList.add("{{"===v?"d-emphasized":"d-def"),t.push(h),c=o+2,(f=s.slice(c).search(/\{\{|\{[%]/)+c)>s.length||f<3)break}var p=document.createElement("span");for(p.textContent=s.slice(c),t.push(p);i.firstChild;)i.firstChild.remove();t.forEach(function(n){i.appendChild(n)}),setTimeout(function(){t.forEach(function(n){n.classList.contains("d-def")?(n.classList.remove("d-def"),n.classList.add("def")):n.classList.contains("d-emphasized")&&(n.classList.remove("d-emphasized"),n.classList.add("emphasized"))})}),n=n.replace(/\{\{|\}\}|\{\%|\%\}/g,""),(l+=1)<e.length&&setTimeout(d,1500)};setTimeout(d,1500)}
},{}]},{},["jP6t"], null)