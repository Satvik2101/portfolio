import H2 from "../../lucid/tags/H2";
import P from "../../lucid/tags/P";
import Tag from "../../lucid/utils/Tag";

class TerminalIntro extends Tag {
    constructor() {
        super("section", [
            new H2("satvik@localhost:~$ ssh satvik.dev"),
            new P("Welcome to Satvik Gupta's personal server."),
            new P("Last login: Tue Jun 11 21:42:03 2025 from 49.205.242.115"),
            new P("satvik@portfolio | INSERT MODE | 100% clean")

        ], { class: "terminal-intro cli-mode" })
    }
}

export default TerminalIntro; 