import Tag from "../lucid/utils/Tag";
import { PortfolioHead } from "./components/PortfolioHead";
import H1 from "../lucid/tags/H1";
import Div from "../lucid/tags/Div";
import Table from "../lucid/tags/Table";
import Br from "../lucid/tags/Br";
import Script from "../lucid/tags/Script";


import RulesSection from "./components/conway/RulesSection";

class Conway extends Tag {
    constructor() {
        super("html", [
            new PortfolioHead({
                title: "Conway's Game of Life",
                description: "Interactive Conway's Game of Life simulation",
                image: "https://www.satvikgupta.com/images/preview.png",
                url: "https://www.satvikgupta.com/conway",
                stylesheets: [
                    "conway/styles.css"
                ]
            }),
            new Tag("body", [
                new H1("Conway's Game of Life"),
                new Div([
                    new Table().id("game-board"),
                    new RulesSection()
                ]).id("board-and-rules"),
                new Br()
            ]),
            new Script().src("conway/game.js")
        ], { lang: "en" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Conway; 