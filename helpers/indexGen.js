"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Index_1 = __importDefault(require("../build/src/Index"));
//read raw.json
var raw = JSON.parse(fs_1.default.readFileSync("./raw.json").toString());
function Play() {
    // var ele = DefaultHeader();
    // var ele = new Div({ divClass: "section", children: [new DefaultHeader()], style: "background-color:#000000;" })
    var ele = new Index_1.default(raw);
    fs_1.default.writeFileSync("./web/index.html", ele.toString());
}
Play();
