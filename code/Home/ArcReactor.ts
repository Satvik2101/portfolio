import A from "../../lucid/tags/A";
import Div from "../../lucid/tags/Div";
import EnhancedImg from "../../lucid/utils/EnhancedImg";

class ArcReactor extends Div {
    constructor() {
        var children = [
            new A([
                new EnhancedImg({
                    src: "./images/arcblue.png",
                    alt: "nav_bar_logo",
                })
            ]).href("#home").target("_self")
        ]
        super(children);
        super.id("arc_reactor");
    }
}

export default ArcReactor;