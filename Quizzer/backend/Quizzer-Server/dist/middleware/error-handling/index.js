"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorHandler = function errorHandler(err, req, res, next) {
  res.status(500).send(err.message);
};

exports.default = errorHandler;
//# sourceMappingURL=index.js.map