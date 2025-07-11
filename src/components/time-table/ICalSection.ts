import Tag from "@satvik2101/lucid/utils/Tag";
import Div from "@satvik2101/lucid/tags/Div";
import P from "@satvik2101/lucid/tags/P";
import Button from "@satvik2101/lucid/tags/Button";

class ICalSection extends Tag {
    constructor() {
        super("div", [
            new Div([
                new P("To download the time table, click on the download button below. The time table will be downloaded in .ics format."),
                new P("You can add this .ics file to your calendar app (Google Calendar, Outlook, etc.) for easy availability on all your devices.")
            ]).id("ical_text"),
            new Div([
                new Button().id("ical_button").populate("Download")
            ])
        ], { id: "ical_section" });
    }
}

export default ICalSection; 