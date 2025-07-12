import P from "@satvik2101/lucid/tags/P";
import Br from "@satvik2101/lucid/tags/Br";
import Span from "@satvik2101/lucid/tags/Span";
import Tag from "@satvik2101/lucid/utils/Tag";
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