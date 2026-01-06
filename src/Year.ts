import Tag from "@satvik2101/lucid/utils/Tag";
import { PortfolioHead } from "./components/PortfolioHead";
import H1 from "@satvik2101/lucid/tags/H1";
import { Button, EnhancedDiv, H2, H3, Header, Script } from "@satvik2101/lucid";


class Circle extends EnhancedDiv {
    constructor(hollow: boolean) {
        super({
            class: hollow ? "hollow-circle" : "filled-circle"
        })
    }
}
class Year extends Tag {
    constructor() {
        const year = new Date().getUTCFullYear();
        const startOfYear = Date.UTC(year, 0, 1);
        const endOfYear = Date.UTC(year + 1, 0, 1);
        const millisecondsInDay = 86400000;
        const totalDays = (endOfYear - startOfYear) / millisecondsInDay;

        super("html", [

            new PortfolioHead({
                title: "Year Progress - ${year}",
                description: "Visual representation of the year's progress",
                image: "https://www.satvikgupta.com/assets/images/preview.png",
                url: "https://www.satvikgupta.com/conway",
                stylesheets: [
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                    "styles/year.css"
                ]
            }),
            new Tag("body", [
                new H1(year.toString()),
                new H2("Year Progress"),
                new Header([
                    Button.withAttributes({ id: "themeToggle", class: "toggle-button" }, "Dark Mode")
                ]),

            ]),

            new EnhancedDiv({
                class: "year-container",
                children: [
                    // Make them all hollow at first.
                    // Browser-side code will fill in the progress.
                    ...Array.from({ length: totalDays }, () => new Circle(true)),
                ]
            }),
            new H3().class("date"),
            new H3().class("percentage"),

            new Script().src("./scripts/toggle.js"),
            new Script().src("./scripts/year.js"),



        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Year; 