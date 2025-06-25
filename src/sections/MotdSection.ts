import P from "../../lucid/tags/P";
import Blockquote from "../../lucid/tags/Blockquote";
import Tag from "../../lucid/utils/Tag";

class MotdSection extends Tag {
    constructor() {
        super("section", [
            P.withAttributes({ class: "motd cli-mode" }, "# “We who cut mere stones must always be envisioning cathedrals”"),
            Blockquote.withAttributes({ class: "motd plain-mode" }, "We who cut mere stones must always be envisioning cathedrals.")
        ], { id: "motd" });
    }
}

export default MotdSection; 