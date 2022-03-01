"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _models = _interopRequireDefault(require("./models"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;

try {
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use("/api/v1/", _index["default"]);
  var sequelize = _models["default"].sequelize;
  sequelize.authenticate().then(function () {
    return console.log("Database connected...");
  });
  app.listen(port, function () {
    console.log("The server is running on port ".concat(port));
  });
} catch (error) {
  console.log(error);
}

var _default = app;
exports["default"] = _default;