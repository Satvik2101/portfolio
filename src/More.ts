import Script from "../lucid/tags/Script";
import Header from "../lucid/tags/Header"
import Blockquote from "../lucid/tags/Blockquote"

import Tag from "../lucid/utils/Tag";
import { DefaultHeader } from "./global/PortfolioHead";
import Button from "../lucid/tags/Button";
import P from "../lucid/tags/P";
import Span from "../lucid/tags/Span";
import Br from "../lucid/tags/Br";
import H1 from "../lucid/tags/H1";
import EnhancedDiv from "../lucid/utils/EnhancedDiv";
import Project from "./interface/Project";
import SimpleAnchor from "../lucid/utils/SimpleAnchor";
import Workexp from "./interface/workexp";
import H2 from "../lucid/tags/H2";
import { AdapativeHeading } from "./Index";


class ProjectEntry extends EnhancedDiv {
    constructor(project: Project) {
        super({
            class: "cli-project",
            children: [
                new EnhancedDiv({ class: "cli-name", children: project.name + (project.product ? "'s " + project.product : "") }),
                // new EnhancedDiv({ class: "cli-desc", children: project.product ?? "" }),
                new EnhancedDiv({ class: "cli-meta", children: project.techstack.join(" · ") }),
                ...project.points.map(point =>
                    new EnhancedDiv({ class: "cli-exp-point", children: `- ${point}` })
                ),
                ...project.links.map(link =>
                    new EnhancedDiv({
                        class: "cli-link",
                        children: new SimpleAnchor({ href: link.url, linkText: `[${link.name}]` })
                    })
                )
            ]
        });
    }
}


class ProjectsSection extends Tag {
    constructor(projects: Project[]) {
        super("section", [
            new AdapativeHeading("cat projects.txt", "Projects"),
            new EnhancedDiv({
                class: "cli-block",
                children: projects.map(p => new ProjectEntry(p))
            })
        ], { id: "projects" });
    }
}

class WorkExpEntry extends EnhancedDiv {
    constructor(exp: Workexp) {
        super({
            class: "cli-workexp",
            children: [
                new EnhancedDiv({ class: "cli-exp-header", children: `${exp.role} @ ${exp.shortName}` }),
                new EnhancedDiv({ class: "cli-exp-dates", children: `${exp.start} – ${exp.end}` }),
                new EnhancedDiv({ class: "cli-meta", children: exp.techstack.join(" · ") }),
                ...exp.points.map(point =>
                    new EnhancedDiv({ class: "cli-exp-point", children: `- ${point}` })
                ),
                ...(exp.links ? ((exp.links).map(link =>
                    new EnhancedDiv({
                        class: "cli-link",
                        children: new SimpleAnchor({ href: link.url, linkText: `[${link.name}]` })
                    })
                )) : [])
            ]
        });
    }
}

class WorkExpSection extends Tag {
    constructor(experiences: Workexp[]) {
        super("section", [
            new AdapativeHeading("cat workexp.txt", "Work Experience"),
            ...experiences
                .filter(exp => exp.excluded !== true)
                .map(exp => new WorkExpEntry(exp))
        ], { id: "workexp" });
    }
}

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

                // new ResumeSection(),
                // new WorkexpSection(rawData.workexp),
                // new ProjectsAndPorsSection({ projects: rawData.projects, pors: rawData.pors })
            ]),
            // new ContactSection(),
            new Br(),
            new Script().src("./toggle.js"),
            // new Script().src("./scripts/workexp_chooser.js"),
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default More;