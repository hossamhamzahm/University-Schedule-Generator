"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config({ path: path_1["default"].join(__dirname, '..', '.env') });
var app = (0, express_1["default"])();
app.get('*', function (req, res) {
    res.status(200).send("OK");
});
var port = process.env.PORT || 3030;
app.listen(port, function () { return console.log("Listening on port", port); });
