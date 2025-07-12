import Script from "@satvik2101/lucid/tags/Script";
import Header from "@satvik2101/lucid/tags/Header"

import Tag from "@satvik2101/lucid/utils/Tag";
import { DefaultHeader } from "./components/PortfolioHead";
import Button from "@satvik2101/lucid/tags/Button";
import H1 from "@satvik2101/lucid/tags/H1";
import Br from "@satvik2101/lucid/tags/Br";
import ProfileLinks from "./components/ProfileLinks";

// Import sections
import TerminalIntro from "./sections/TerminalIntro";
import HeroSection from "./sections/HeroSection";
import MotdSection from "./sections/MotdSection";
import AboutSection from "./sections/AboutSection";

// Import navigation
import { NavigateTo } from "./components/NavigateTo";

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
                new ProfileLinks(),
                new HeroSection(),
                new MotdSection(),
                new AboutSection(),
                new NavigateTo({ href: "https://www.satvikgupta.com/resume.pdf", cliText: "curl satvikgupta.com/resume.pdf -O", plainText: "Download Resume", iconClass: "fa-regular fa-file-lines", target: "_blank" }),
                new NavigateTo({ href: "/more", cliText: "./.show-more.sh", plainText: "Cool, show me more!", iconClass: "fa-duotone fa-solid fa-link", })
            ]),

            new Br(),
            new Script().src("./scripts/toggle.js"),
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Index;