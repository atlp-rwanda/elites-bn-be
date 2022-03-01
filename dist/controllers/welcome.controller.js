"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welcome = void 0;

var welcome = function welcome(req, res, next) {
  res.status(200).json({
    status: 200,
    message: "Welcome to barefoot api",
    payload: ""
  });
};

exports.welcome = welcome;