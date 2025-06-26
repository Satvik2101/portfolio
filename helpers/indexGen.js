"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Index_1 = __importDefault(require("../build/src/Index"));
const More_1 = __importDefault(require("../build/src/More"))
const Note_1 = __importDefault(require("../build/src/Notes"))
const Error404_1 = __importDefault(require("../build/src/404"))
const TimeTable_1 = __importDefault(require("../build/src/TimeTable"))
const Conway_1 = __importDefault(require("../build/src/Conway"))
const Login_1 = __importDefault(require("../build/src/Login"))
const Success_1 = __importDefault(require("../build/src/Success"))
//read raw.json
var raw = JSON.parse(fs_1.default.readFileSync("./raw.json").toString());
function Play() {
    var ele = new Index_1.default(raw);
    fs_1.default.writeFileSync("./web/index.html", ele.toString());
    var ele2 = new More_1.default(raw)
    fs_1.default.writeFileSync("./web/more.html", ele2.toString())
    var ele3 = new Note_1.default();
    fs_1.default.writeFileSync("./web/notes.html", ele3.toString())
    var ele4 = new Error404_1.default();
    fs_1.default.writeFileSync("./web/404.html", ele4.toString())
    var ele5 = new TimeTable_1.default();
    fs_1.default.writeFileSync("./web/time-table.html", ele5.toString())
    var ele6 = new Conway_1.default();
    fs_1.default.writeFileSync("./web/conway.html", ele6.toString())
    var ele7 = new Login_1.default();
    fs_1.default.writeFileSync("./web/login.html", ele7.toString())
    var ele8 = new Success_1.default();
    fs_1.default.writeFileSync("./web/success.html", ele8.toString())
}
Play();
