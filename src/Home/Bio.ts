import Br from "../../lucid/tags/Br";
import P from "../../lucid/tags/P";
import SimpleAnchor from "../../lucid/utils/SimpleAnchor";

class Bio extends P {
    constructor() {
        super();
        this.class("padded_centered").id("bio").p([
            "Computer Engineering senior at Delhi Technological University.",
            new Br(),
            "Technology,coding, and programming have been my passions since I wrote my",
            new SimpleAnchor({ href: "https://github.com/Satvik2101/Clean-Folder", linkText: "first Python Script" }),
            "at the age of 15. Building stuff, solving problems, automating tasks, and above all - learning new things - are what I love to do.",

        ])
    }
}


export default Bio;