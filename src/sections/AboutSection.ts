import P from "../../lucid/tags/P";
import Tag from "../../lucid/utils/Tag";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import { AdaptiveHeading } from "../components/AdaptiveHeading";

class AboutSection extends Tag {
    constructor() {
        super("section", [
            new AdaptiveHeading("cat about.txt", "About Me"),
            new EnhancedDiv({
                class: "cli-block",
                children: [
                    new P("I write software to solve real problems. I care about elegant architecture, maintanability, and automating the boring stuff."),
                    new P("Whether it's infrastructure, orchestration workflows, or simple Python scripts, I build with intention.")
                ]
            })
        ], { id: "about" });
    }
}

export default AboutSection; 