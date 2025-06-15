"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Index_1 = __importDefault(require("../build/src/Index"));
const More_1 = __importDefault(require("../build/src/More"))
//read raw.json
var raw = JSON.parse(fs_1.default.readFileSync("./raw.json").toString());
function Play() {
    var ele = new Index_1.default(raw);
    fs_1.default.writeFileSync("./web/index.html", ele.toString());
    var ele2 = new More_1.default(raw)
    fs_1.default.writeFileSync("./web/more.html", ele2.toString())
}
Play();
