"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-heading-rank";
exports.ids = ["vendor-chunks/hast-util-heading-rank"];
exports.modules = {

/***/ "(ssr)/./node_modules/hast-util-heading-rank/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/hast-util-heading-rank/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headingRank: () => (/* binding */ headingRank)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Nodes} Nodes\n */\n\n/**\n * Get the rank (`1` to `6`) of headings (`h1` to `h6`).\n *\n * @param {Nodes} node\n *   Node to check.\n * @returns {number | undefined}\n *   Rank of the heading or `undefined` if not a heading.\n */\nfunction headingRank(node) {\n  const name = node.type === 'element' ? node.tagName.toLowerCase() : ''\n  const code =\n    name.length === 2 && name.charCodeAt(0) === 104 /* `h` */\n      ? name.charCodeAt(1)\n      : 0\n  return code > 48 /* `0` */ && code < 55 /* `7` */\n    ? code - 48 /* `0` */\n    : undefined\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhlYWRpbmctcmFuay9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29sbGFtYS1jaGF0LWZyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1oZWFkaW5nLXJhbmsvbGliL2luZGV4LmpzP2Q5ZGEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuTm9kZXN9IE5vZGVzXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIHJhbmsgKGAxYCB0byBgNmApIG9mIGhlYWRpbmdzIChgaDFgIHRvIGBoNmApLlxuICpcbiAqIEBwYXJhbSB7Tm9kZXN9IG5vZGVcbiAqICAgTm9kZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtudW1iZXIgfCB1bmRlZmluZWR9XG4gKiAgIFJhbmsgb2YgdGhlIGhlYWRpbmcgb3IgYHVuZGVmaW5lZGAgaWYgbm90IGEgaGVhZGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWRpbmdSYW5rKG5vZGUpIHtcbiAgY29uc3QgbmFtZSA9IG5vZGUudHlwZSA9PT0gJ2VsZW1lbnQnID8gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJ1xuICBjb25zdCBjb2RlID1cbiAgICBuYW1lLmxlbmd0aCA9PT0gMiAmJiBuYW1lLmNoYXJDb2RlQXQoMCkgPT09IDEwNCAvKiBgaGAgKi9cbiAgICAgID8gbmFtZS5jaGFyQ29kZUF0KDEpXG4gICAgICA6IDBcbiAgcmV0dXJuIGNvZGUgPiA0OCAvKiBgMGAgKi8gJiYgY29kZSA8IDU1IC8qIGA3YCAqL1xuICAgID8gY29kZSAtIDQ4IC8qIGAwYCAqL1xuICAgIDogdW5kZWZpbmVkXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/hast-util-heading-rank/lib/index.js\n");

/***/ })

};
;