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

class AdapativeHeading extends Tag {
    constructor(cliHeading: string, plainHeading: string) {
        super("H2", [
            Span.withAttributes({ class: "cli-mode" }, `~$ ${cliHeading}`),
            Span.withAttributes({ class: "plain-mode" }, plainHeading)
        ],

        )
    }
}

class HeroSection extends Tag {
    constructor() {
        super("section", [
            new AdapativeHeading("whoami", "Who am I?"),
            new P([
                "Satvik Gupta",
                new Br(),
                "Backend Engineer · Infra Enthusiast · Code Purist",
                Span.withAttributes({ class: "cursor" }, "|")
            ])
        ])
    }
}

class MotdSection extends Tag {
    constructor() {
        super("section", [
            P.withAttributes({ class: "motd cli-mode" }, "# “We who cut mere stones must always be envisioning cathedrals.”"),
            Blockquote.withAttributes({ class: "motd plain-mode" }, "We who cut mere stones must always be envisioning cathedrals.")
        ], { id: "motd" });

    }
}
class AboutSection extends Tag {
    constructor() {
        super("section", [
            new AdapativeHeading("cat about.txt", "About Me"),
            new EnhancedDiv({
                class: "cli-block",
                children:

                    [
                        new P("I write software to solve real problems. I care about elegant architecture, maintanability, and automating the boring stuff."),
                        // new P("I care about elegant architecture, maintanability, and automating the boring stuff"),
                        new P("Whether it's infrastructure, orchestration workflows, or simple Python scripts, I build with intention.")


                    ]


            },

            )

        ], { id: "about" });
    }
}

class ProjectEntry extends EnhancedDiv {
    constructor(project: Project) {
        super({
            class: "cli-project",
            children: [
                new EnhancedDiv({ class: "cli-name", children: project.name + (project.product ? "'s " + project.product : "") }),
                // new EnhancedDiv({ class: "cli-desc", children: project.product ?? "" }),
                new EnhancedDiv({ class: "cli-meta", children: project.techstack.join(" · ") }),
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
                )
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

class ResumeSection extends Tag {
    constructor() {
        super("section", [
            new AdapativeHeading("curl satvik.dev/resume.pdf -O", "Download Resume"),
            new SimpleAnchor({ href: "https://www.satvikgupta.com/satvik-gupta-resume.pdf", linkText: "" }).p(
                [Span.withAttributes({ class: "cli-mode" }, "Save resume.pdf to disk"),
                Span.withAttributes({ class: "plain-mode" }, "Resume.pdf")]
            )
        ]);
    }
}


class Index extends Tag {
    constructor(rawData: { [key: string]: any }) {
        super("html", [

            new DefaultHeader(),
            new Tag("body", [

                new Header([
                    Button.withAttributes({ id: "modeToggle" }, "Developer Mode")
                ]),
                new H1("Satvik Gupta"),
                new TerminalIntro(),
                new HeroSection(),
                new MotdSection(),
                new AboutSection(),
                // new ProjectsSection([...rawData.projects, ...rawData.pors]),
                // new WorkExpSection(rawData.workexp),
                new ResumeSection(),
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

export default Index;