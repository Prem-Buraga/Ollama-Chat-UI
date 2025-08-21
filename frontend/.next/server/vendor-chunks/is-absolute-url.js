"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-absolute-url";
exports.ids = ["vendor-chunks/is-absolute-url"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-absolute-url/index.js":
/*!***********************************************!*\
  !*** ./node_modules/is-absolute-url/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isAbsoluteUrl)\n/* harmony export */ });\n// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1\n// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3\nconst ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\\d+\\-.]*?:/;\n\n// Windows paths like `c:\\`\nconst WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\\\/;\n\nfunction isAbsoluteUrl(url) {\n\tif (typeof url !== 'string') {\n\t\tthrow new TypeError(`Expected a \\`string\\`, got \\`${typeof url}\\``);\n\t}\n\n\tif (WINDOWS_PATH_REGEX.test(url)) {\n\t\treturn false;\n\t}\n\n\treturn ABSOLUTE_URL_REGEX.test(url);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtYWJzb2x1dGUtdXJsL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZTtBQUNmO0FBQ0Esc0RBQXNELFdBQVc7QUFDakU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbGxhbWEtY2hhdC1mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9pcy1hYnNvbHV0ZS11cmwvaW5kZXguanM/N2U4ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTY2hlbWU6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tMy4xXG4vLyBBYnNvbHV0ZSBVUkw6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tNC4zXG5jb25zdCBBQlNPTFVURV9VUkxfUkVHRVggPSAvXlthLXpBLVpdW2EtekEtWlxcZCtcXC0uXSo/Oi87XG5cbi8vIFdpbmRvd3MgcGF0aHMgbGlrZSBgYzpcXGBcbmNvbnN0IFdJTkRPV1NfUEFUSF9SRUdFWCA9IC9eW2EtekEtWl06XFxcXC87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVcmwodXJsKSB7XG5cdGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGEgXFxgc3RyaW5nXFxgLCBnb3QgXFxgJHt0eXBlb2YgdXJsfVxcYGApO1xuXHR9XG5cblx0aWYgKFdJTkRPV1NfUEFUSF9SRUdFWC50ZXN0KHVybCkpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gQUJTT0xVVEVfVVJMX1JFR0VYLnRlc3QodXJsKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-absolute-url/index.js\n");

/***/ })

};
;