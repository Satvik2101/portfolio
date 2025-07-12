import Tag from "@satvik2101/lucid/utils/Tag";
import { PortfolioHead } from "./components/PortfolioHead";
import H1 from "@satvik2101/lucid/tags/H1";
import Div from "@satvik2101/lucid/tags/Div";
import Table from "@satvik2101/lucid/tags/Table";
import Br from "@satvik2101/lucid/tags/Br";
import Script from "@satvik2101/lucid/tags/Script";


import RulesSection from "./components/conway/RulesSection";

class Conway extends Tag {
    constructor() {
        super("html", [
            new PortfolioHead({
                title: "Conway's Game of Life",
                description: "Interactive Conway's Game of Life simulation",
                image: "https://www.satvikgupta.com/assets/images/preview.png",
                url: "https://www.satvikgupta.com/conway",
                stylesheets: [
                    "styles/conway.css"
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
            new Script().src("scripts/game.js")
        ], { lang: "en" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Conway; 