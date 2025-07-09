import Tag from "../lucid/utils/Tag";
import Head from "../lucid/tags/Head";
import Meta from "../lucid/tags/Meta";
import Title from "../lucid/tags/Title";
import Script from "../lucid/tags/Script";
import Link from "../lucid/tags/Link";
import Style from "../lucid/tags/Style";
import Div from "../lucid/tags/Div";

class Success extends Tag {
    constructor() {
        super("html", [
            new Head([
                new Meta().charset("UTF-8"),
                new Meta().name("viewport").content("width=device-width, initial-scale=1.0"),
                new Script().src("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"),
                new Script().src("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth-compat.js"),
                new Script().src("https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore-compat.js"),
                new Link().rel("preconnect").href("https://fonts.googleapis.com"),
                new Link().rel("preconnect").href("https://fonts.gstatic.com").crossorigin(""),
                new Link().href("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Galada&family=Roboto+Slab:wght@100..900&display=swap").rel("stylesheet"),
                new Title("❄️"),
                new Script().async().src("https://www.googletagmanager.com/gtag/js?id=G-WX57KF6HY8"),
                new Script(`
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', 'G-WX57KF6HY8');
                `)
            ]),
            new Tag("body", [
                new Style(`
                    br {
                        display: block;
                        content: "";
                        margin-top: 0px;
                    }
                `),
                new Div().id("app")
            ]),
            new Script().type("module").src("./scripts/meterApp.js")
        ], { lang: "en" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Success; 