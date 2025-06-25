import P from "../../lucid/tags/P";
import Br from "../../lucid/tags/Br";
import Span from "../../lucid/tags/Span";
import Tag from "../../lucid/utils/Tag";
import { AdaptiveHeading } from "../components/AdaptiveHeading";

class HeroSection extends Tag {
    constructor() {
        super("section", [
            new AdaptiveHeading("whoami", "Who am I?"),
            new P([
                "Satvik Gupta",
                new Br(),
                "Backend Engineer · Infra Enthusiast · Code Purist",
                Span.withAttributes({ class: "cursor" }, "|")
            ])
        ])
    }
}

export default HeroSection; 