parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"jP6t":[function(require,module,exports) {
var n,e="def binary_search(a, val):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n\n    return -1\n\nbinary_search([-5, 1, 3, 4, 5, 7, 18, 19], 7)",i=[["[-5, 1, 3, 4, 5, 7, 18, 19], 7)","a=[-5, 1, 3, 4, 5, 7, 18, 19], val=7):\n    l = 0\n    r = len(a) - 1\n\n    while l <= r:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n\n    return -1\n"],["len(a)","8","a=[-5, 1, 3, 4, 5, 7, 18, 19]"],["8 - 1","7"],["l <=","{{0}} <=","l = 0"],["<= r","<= {{7}}","r = 7"],["0 <= 7","True"],["\n    while True:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    while True:\n{{        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n}}"],["\n    while True:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    mid = (l + r) // 2\n    if val == a[mid]:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["l + r","{{0}} + r","l = 0"],["0 + r","0 + {{7}}","r = 7"],["(0 + 7)","7"],["7 // 2","3"],["\n    mid = 3","    mid = 3\n"],["val ==","{{7}} ==","val=7"],["== a[mid]","== a[{{3}}]","mid = 3"],["a[3]","4"," 4"],["7 == 4","False"],["\n    if False:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    if False:\n        return mid\n{{    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n}}"],["\n    if False:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["val <","{{7}} <","val=7"],["a[mid]","a[{{3}}]","mid = 3"],["a[3]","4"," 4"],["7 < 4","False"],["\n    elif False:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    elif False:\n        r = mid - 1\n    else:\n{{        l = mid + 1\n}}"],["\n    elif False:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    l = mid + 1\n"],["mid + 1","{{3}} + 1","mid = 3"],["3 + 1","{{4}}"],["    l = 0","    l = 4"],["3\n\n    l = 4","3{{}}"],["3\n\n","3{{\n\n    while l <= r:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n}}\n"],["l <=","{{4}} <=","l = 4"],["<= r","<= {{7}}","r = 7"],["4 <= 7","True"],["\n    while True:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    while True:\n{{        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n}}"],["\n    while True:\n        mid = (l + r) // 2\n        if val == a[mid]:\n            return mid\n        elif val < a[mid]:\n            r = mid - 1\n        else:\n            l = mid + 1\n","\n    mid = (l + r) // 2\n    if val == a[mid]:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n"],["l + r","{{4}} + r","l = 4"],["4 + r","4 + {{7}}","r = 7"],["(4 + 7)","11"],["11 // 2","5"],["    mid = 3\n","    mid = 5\n"],["    mid = 5\n\n    mid = 5","    mid = 5\n"],["val ==","{{7}} ==","val=7"],["== a[mid]","== a[{{5}}]","mid = 5"],["a[5]","7"," 7"],["7 == 7","True"],["\n    if True:\n        return mid\n","\n    if True:\n{{        return mid\n}}"],["\n    if True:\n        return mid\n    elif val < a[mid]:\n        r = mid - 1\n    else:\n        l = mid + 1\n","\n    return mid\n"],["return mid","return {{5}}","mid = 5"],[]],l=e.slice(0,256),d={},r=document.getElementById("src"),m=document.getElementById("start"),a=document.getElementById("stop");r&&m&&a&&(r.textContent=e,m.addEventListener("click",o),a.addEventListener("click",s),document.body.addEventListener("keydown",function(n){"ArrowLeft"===n.key?u():"ArrowRight"===n.key?f():" "===n.key&&s()}));var t=0;function s(){t=Math.min(t,i.length-1),n&&clearTimeout(n)}function f(){s(),n=setTimeout(v)}function u(){t-=2,t=Math.max(t,0),f()}function c(n){if(n>=i.length&&(n=i.length-1),n in d)return d[n];for(var l=e,r=0;r<=n;r++)if(r in d)l=d[r],r<n&&(l=l.replace(/\{\{|\}\}|\{\%|\%\}/g,""));else{var m=i[r];if(0===r?l=l.slice(256):r===i.length-1&&(l="{{5}}"),m.length){var a=m[1];a.indexOf("{{")<0&&(a="{{"+a+"}}"),l=l.replace(m[0],a),m.length>2&&(l=l.replace(m[2],"{%"+m[2]+"%}"))}d[r]=l,r<n&&(l=l.replace(/\{\{|\}\}|\{\%|\%\}/g,""))}return l}function v(){for(var e=[],d=l+c(t),m=d.search(/\{\{|\{[%]/),a=0;m>=a;){var s=d.slice(m,m+2),f="{{"===s?"}}":"%}",u=document.createElement("span");u.textContent=d.slice(a,m),e.push(u);var o=d.indexOf(f,m+2);(u=document.createElement("span")).textContent=d.slice(m+2,o),u.classList.add("{{"===s?"emphasized":"d-def"),e.push(u),a=o+2,m=d.slice(a).search(/\{\{|\{[%]/)+a}var h=document.createElement("span");for(h.textContent=d.slice(a),e.push(h);r.firstChild;)r.firstChild.remove();e.forEach(function(n){r.appendChild(n)}),setTimeout(function(){e.forEach(function(n){n.classList.contains("d-def")&&(n.classList.remove("d-def"),n.classList.add("def"))})}),(t+=1)<i.length&&(n=setTimeout(v,1500))}function o(){t>=i.length&&(t=0,r.textContent=e),n&&clearTimeout(n),n=setTimeout(v,1500)}
},{}]},{},["jP6t"], null)