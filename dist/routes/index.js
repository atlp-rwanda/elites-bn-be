"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _welcomeRoutes = _interopRequireDefault(require("./api/welcomeRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router();

routes.use('/', _welcomeRoutes["default"]);
var _default = routes;
exports["default"] = _default;