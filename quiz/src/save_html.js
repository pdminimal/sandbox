"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var puppeteer = require("puppeteer");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, args, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setViewport({ width: 1440, height: 749 })];
            case 3:
                _a.sent();
                args = process.argv.slice(2);
                return [4 /*yield*/, page.goto(args[0])];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var CSS_PROPERTIES = [
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
                        var INHERITED_PROPERTIES = ['color', 'font-', 'letter-', 'list-style', 'text-align'];
                        var TagComponent = /** @class */ (function () {
                            function TagComponent(name, parent) {
                                if (parent === void 0) { parent = null; }
                                this.children = [];
                                this.name = '';
                                this.text = '';
                                this.styles = {};
                                this.attributes = {};
                                this.name = name ? name.toLowerCase() : name;
                                this.parent = parent;
                            }
                            TagComponent.prototype.toHtml = function () {
                                var styleAttrValue = '';
                                var attrs = [];
                                var attrsKeys = Object.keys(this.attributes);
                                for (var i = 0; i < attrsKeys.length; i += 1) {
                                    var attr = attrsKeys[i];
                                    if (this.attributes[attr] != null) {
                                        var attrValue = this.attributes[attr].replace(/"/g, '\'');
                                        if (attr !== 'style' && attr !== 'srcset') {
                                            attrs.push(attr + "=\"" + attrValue + "\"");
                                        }
                                    }
                                }
                                var styles = [];
                                var styleKeys = Object.keys(this.styles);
                                for (var i = 0; i < styleKeys.length; i += 1) {
                                    var style = styleKeys[i];
                                    if (this.styles[style] != null) {
                                        var styleValue = this.styles[style].replace(/"/g, '\'');
                                        if (styleValue) {
                                            styles.push(style + ":" + styleValue + ";");
                                        }
                                    }
                                }
                                var styleAttr = styles.length ? " style=\"" + styles.join('') + "\"" : '';
                                var attributes = attrs.length ? ' ' + attrs.join(' ') : '';
                                var openTag = "<" + this.name + attributes + styleAttr + ">";
                                var closeTag = "</" + this.name + ">";
                                var contents = [];
                                this.children.forEach(function (child) {
                                    if (child.name) {
                                        if (!['script', 'style'].includes(child.name)) {
                                            contents.push(child.toHtml());
                                        }
                                    }
                                    else {
                                        var inner = document.createElement('span');
                                        inner.textContent = child.text;
                                        contents.push(inner.innerHTML);
                                        inner.remove();
                                    }
                                });
                                var content = contents.join('');
                                return "" + openTag + content + closeTag;
                            };
                            return TagComponent;
                        }());
                        var root = new TagComponent('html');
                        function walkDOM(parentTag, node) {
                            var childnode = node.firstChild;
                            while (childnode) {
                                var newParent = makeTree(parentTag, childnode);
                                walkDOM(newParent, childnode);
                                childnode = childnode.nextSibling;
                            }
                        }
                        function makeTree(parentTag, child) {
                            var ret = new TagComponent(child.tagName);
                            if (child.tagName) {
                                var styles = window.getComputedStyle(child, null);
                                for (var i = 0; i < styles.length; i++) {
                                    var style = styles[i] || '';
                                    for (var _i = 0, CSS_PROPERTIES_1 = CSS_PROPERTIES; _i < CSS_PROPERTIES_1.length; _i++) {
                                        var property = CSS_PROPERTIES_1[_i];
                                        if (style.startsWith(property)) {
                                            var inherit = false;
                                            for (var _a = 0, INHERITED_PROPERTIES_1 = INHERITED_PROPERTIES; _a < INHERITED_PROPERTIES_1.length; _a++) {
                                                var inherited = INHERITED_PROPERTIES_1[_a];
                                                if (style.startsWith(inherited)) {
                                                    inherit = true;
                                                    break;
                                                }
                                            }
                                            if (inherit) {
                                                var tmpParent = parentTag;
                                                while (tmpParent) {
                                                    if (tmpParent.styles[style]) {
                                                        break;
                                                    }
                                                    tmpParent = tmpParent.parent;
                                                }
                                                if (!tmpParent || tmpParent.styles[style] !== styles.getPropertyValue(style)) {
                                                    ret.styles[style] = styles.getPropertyValue(style);
                                                }
                                            }
                                            else {
                                                ret.styles[style] = styles.getPropertyValue(style);
                                            }
                                            break;
                                        }
                                    }
                                }
                                var attrs = child.attributes;
                                for (var i = 0; i < attrs.length; i++) {
                                    var attrName = attrs[i].name;
                                    var value = attrs[i].value;
                                    if (['id', 'class'].includes(attrName)) {
                                        continue;
                                    }
                                    if (attrName === 'src' || attrName === 'href') {
                                        if (value.startsWith('//')) {
                                            value = 'https:' + value;
                                        }
                                        else if (value.startsWith('/')) {
                                            value = "https://" + location.hostname + value;
                                        }
                                    }
                                    ret.attributes[attrName] = value;
                                }
                            }
                            else if (child.nodeType === 3) {
                                ret.text = child.textContent || '';
                            }
                            parentTag.children.push(ret);
                            return ret;
                        }
                        walkDOM(root, document.documentElement);
                        return root.toHtml();
                    })];
            case 5:
                html = _a.sent();
                console.log(html);
                return [4 /*yield*/, browser.close()];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
