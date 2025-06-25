import Script from "../lucid/tags/Script";
import Header from "../lucid/tags/Header"

import Tag from "../lucid/utils/Tag";
import { DefaultHeader } from "./global/PortfolioHead";
import Button from "../lucid/tags/Button";
import H1 from "../lucid/tags/H1";
import Br from "../lucid/tags/Br";

// Import sections
import WorkExpSection from "./sections/WorkExpSection";
import ProjectsSection from "./sections/ProjectsSection";

class More extends Tag {
    constructor(rawData: { [key: string]: any }) {
        super("html", [

            new DefaultHeader(),
            new Tag("body", [

                new Header([
                    Button.withAttributes({ id: "modeToggle" }, "Developer Mode")
                ]),
                new H1("Satvik Gupta"),
                new WorkExpSection(rawData.workexp),
                new ProjectsSection([...rawData.projects]),

            ]),
            new Br(),
            new Script().src("./toggle.js"),
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default More;