import Tag from "@satvik2101/lucid/utils/Tag";
import Head from "@satvik2101/lucid/tags/Head";
import Meta from "@satvik2101/lucid/tags/Meta";
import Title from "@satvik2101/lucid/tags/Title";
import Script from "@satvik2101/lucid/tags/Script";
import Link from "@satvik2101/lucid/tags/Link";
import Style from "@satvik2101/lucid/tags/Style";
import Div from "@satvik2101/lucid/tags/Div";

class Login extends Tag {
    constructor() {
        super("html", [
            new Head([
                new Meta().charset("UTF-8"),
                new Title("❄️"),
                new Script().src("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"),
                new Script().src("https://www.gstatic.com/firebasejs/10.0.0/firebase-auth-compat.js"),
                new Script().src("https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.js"),
                new Link().type("text/css").rel("stylesheet").href("https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.css"),
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
                    body {
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        align-items: center;
                    }

                    #firebaseui-auth-container {
                        flex-grow: 1;
                    }
                `),
                new Div().id("firebaseui-auth-container")
            ]),
            new Script().type("module").src("./scripts/app.js")
        ])
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Login; 