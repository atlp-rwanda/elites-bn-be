"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _welcomeController = require("../../controllers/welcome.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router();

route.get('/', _welcomeController.welcome);
var _default = route;
exports["default"] = _default;