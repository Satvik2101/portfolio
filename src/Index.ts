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
import A from "../lucid/tags/A";
import childrenType from "../lucid/childrenType";

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

export class AdapativeHeading extends Tag {
    constructor(cliHeading: string, plainHeading: string, pre?: Tag) {
        super("H2", [
            pre ?? new Span(),
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
            P.withAttributes({ class: "motd cli-mode" }, "# “We who cut mere stones must always be envisioning cathedrals”"),
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

export class NaviagateTo extends A {
    constructor(props: { href: string; cliText: string; plainText: string, iconClass: string, target?: string }) {
        super([

            new AdapativeHeading(props.cliText, props.plainText, new Tag("i").setAttr("class", props.iconClass).style("padding-right:12px"),),

        ]);
        this.href(props.href);
        this.target(props.target ?? "_self")
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
                new NaviagateTo({ href: "https://www.satvikgupta.com/satvik-gupta-resume.pdf", cliText: "curl satvikgupta.com/satvik-gupta-resume.pdf -O", plainText: "Download Resume", iconClass: "fa-regular fa-file-lines", target: "_blank" }),
                // new AdapativeHeading("./.show-more.sh", "Cool, show me more!"),
                new NaviagateTo({ href: "/more", cliText: "./.show-more.sh", plainText: "Cool, show me more!", iconClass: "fa-duotone fa-solid fa-link", })
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