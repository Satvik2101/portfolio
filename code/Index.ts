import Script from "../lucid/tags/Script";
import { Tag } from "../lucid/utils/Tag";
import ContactSection from "./Contact/ContactSection";
import BackgroundImageSection from "./Home/BackgroundImageSection";
import ProjectsAndPorsSection from "./Project/ProjectsAndPorsSection";
import WorkexpSection from "./Workexp/WorkexpSection";
import Footer from "./global/PortfolioFooter";
import { DefaultHeader } from "./global/PortfolioHead";

class Index extends Tag {
    constructor(rawData: { [key: string]: any }) {
        super("html", [
            new DefaultHeader(),
            new Tag("body", [
                new BackgroundImageSection(),
                new WorkexpSection(rawData.workexp),
                new ProjectsAndPorsSection({ projects: rawData.projects, pors: rawData.pors })
            ]),
            new ContactSection(),
            new Footer(),
            new Script().src("./scripts/typewriter.js"),
            new Script().src("./scripts/workexp_chooser.js"),
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Index;