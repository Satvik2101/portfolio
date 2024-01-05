import A from "../../lucid/tags/A";
import I from "../../lucid/tags/I";
import Span from "../../lucid/tags/Span";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import Link from "../interface/Link";


class ProjectLink extends A {
    constructor(props: Link) {
        var icon = "";
        if (props.name == "App Store") {
            icon = "fa-brands fa-app-store fa-2x";
        } else if (props.name == "Play Store") {
            icon = "fab fa-google-play fa-2x";
        } else if (props.name == "Github") {
            icon = "fab fa-github fa-2x";
        } else if (props.name == "Website") {
            icon = "fas fa-link fa-2x";
        }

        super()
        super.href(props.url).p([
            new Span().class("project_link").p([
                new I().class(icon)
            ])
        ])
    }
}

class ProjectLinks extends EnhancedDiv {
    constructor(props: { links: Link[] }) {
        super({
            class: "project_links",
            children: props.links.map((link) => new ProjectLink(link))
        });
    }
}

export default ProjectLinks;