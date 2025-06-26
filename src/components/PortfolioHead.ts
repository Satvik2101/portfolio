import Base from "../../lucid/tags/Base";
import Head from "../../lucid/tags/Head";
import Link from "../../lucid/tags/Link";
import Meta from "../../lucid/tags/Meta";
import Title from "../../lucid/tags/Title";

interface HeaderProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    stylesheets?: string[];
}

class PortfolioHead extends Head {
    constructor(props: HeaderProps) {
        const titleTag = props.title ? new Title(props.title) : "";
        var stylesheets = props.stylesheets?.map((stylesheet) => {
            return new Link().rel("stylesheet").href(stylesheet);
        });

        super([
            new Meta().charset("UTF-8"),
            new Meta().http_equiv("X-UA-Compatible").content("IE=edge"),
            new Meta().name("viewport").content("width=device-width, initial-scale=1.0"),
            new Base().target("_blank"),
            new Link().rel("icon").href("/favicon.ico").type("image/x-icon"),
            props.description ? new Meta().name("description").content(props.description) : "",
            props.title ? new Meta().property("og:title").content(props.title) : "",
            props.description ? new Meta().property("og:description").content(props.description) : "",

            props.image ? new Meta().property("og:image").content(props.image) : "",
            props.url ? new Meta().property("og:url").content(props.url) : "",
            new Link().rel("canonical").href(props.url),
            new Link().rel("preconnect").href("https://fonts.googleapis.com"),
            new Link().rel("preconnect").href("https://fonts.gstatic.com").crossorigin(""),

            ...(stylesheets ?? []),
            titleTag
        ])
    }
}

class DefaultHeader extends PortfolioHead {

    constructor() {
        super({
            title: "Satvik Gupta",
            description: "I'm Satvik Gupta, a Software Developer. This is my Portfolio Website.",
            image: "https://www.satvikgupta.com/images/preview.png",
            url: "https://www.satvikgupta.com",
            stylesheets: [
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                "/styles.css"
            ],

        })
    }
}

export { PortfolioHead, DefaultHeader };