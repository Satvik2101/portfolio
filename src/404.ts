import Tag from "@satvik2101/lucid/utils/Tag";
import { DefaultHeader } from "./components/PortfolioHead";
import H1 from "@satvik2101/lucid/tags/H1";
import P from "@satvik2101/lucid/tags/P";
import A from "@satvik2101/lucid/tags/A";
import Img from "@satvik2101/lucid/tags/Img";
import Style from "@satvik2101/lucid/tags/Style";

class Error404 extends Tag {
    constructor() {
        super("html", [

            new DefaultHeader(),
            new Style(`
                h1 {
                    padding-top: 0 ;
                    padding-bottom: 0 ;
                    margin-top: 0 ;
                    margin-bottom: 0 ;
                }
            `),
            new Tag("body", [


                new H1("404"),
                new Img().src("./assets/images/ducky.png").height("300px"),
                new P("Oops, we couldn't find the page you were looking for."),
                new P("Here's a duck to help you debug."),
                new P([
                    "Or you could just head back ",
                    new A("home.").href("https://www.satvikgupta.com"),
                    " "
                ])

            ]),



        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Error404; 