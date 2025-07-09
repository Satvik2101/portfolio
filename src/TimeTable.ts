import Tag from "../lucid/utils/Tag";
import { PortfolioHead } from "./components/PortfolioHead";
import H1 from "../lucid/tags/H1";
import P from "../lucid/tags/P";
import Br from "../lucid/tags/Br";
import Table from "../lucid/tags/Table";
import Tr from "../lucid/tags/Tr";
import Th from "../lucid/tags/Th";
import Script from "../lucid/tags/Script";

// Import components
import TimeTableInputs from "./components/time-table/TimeTableInputs";
import TimeTableRow from "./components/time-table/TimeTableRow";
import ICalSection from "./components/time-table/ICalSection";

class TimeTable extends Tag {
    constructor() {
        super("html", [
            new PortfolioHead({
                title: "Satvik Gupta - Time Table Creator",
                description: "I'm Satvik Gupta, a Software Developer, and student at Delhi Technological University. This page is an easy tool for students to create a visual time-table when starting a new semester.",
                image: "https://www.satvikgupta.com/assets/images/preview.png",
                url: "https://www.satvikgupta.com/time-table",
                stylesheets: [
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                    "styles.css",
                    "styles/navbar_light.css",
                    "styles/time_table_styles.css"
                ]
            }),
            new Tag("body", [
                new H1("Time Table Creator"),
                new P("Enter slot (E1, E2,etc.) and the subject name. The time table will be created automatically. You can edit the table cells to add more details,or to remove a subject from a slot. Save a screenshot of the time table when done for easy access!"),
                new Br(),
                new TimeTableInputs(),
                new Table([
                    new Tr([
                        new Th(""),
                        ...Array.from({ length: 10 }, (_, i) => {
                            const startHour = 8 + i;
                            const endHour = startHour + 1;
                            const startDisplay = startHour > 12 ? startHour - 12 : startHour;
                            const endDisplay = endHour > 12 ? endHour - 12 : endHour;
                            return new Th(`${startDisplay} - ${endDisplay}`);
                        })
                    ]),
                    new TimeTableRow("Monday", "mon"),
                    new TimeTableRow("Tuesday", "tue"),
                    new TimeTableRow("Wednesday", "wed"),
                    new TimeTableRow("Thursday", "thu"),
                    new TimeTableRow("Friday", "fri")
                ]).id("time-table"),
                new Br(),
                new ICalSection()
            ]),
            new Script().src("./scripts/time-table/fill_tt.js"),
            new Script().src("./scripts/time-table/create_ics.js")
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default TimeTable; 