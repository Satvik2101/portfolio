import Tag from "../../../lucid/utils/Tag";
import Input from "../../../lucid/tags/Input";
import Button from "../../../lucid/tags/Button";
import Div from "../../../lucid/tags/Div";

class TimeTableInputs extends Tag {
    constructor() {
        super("div", [
            new Input().type("text").id("slotInput").placeholder("Enter slot here"),
            new Input()
                .type("text")
                .id("subjectInput")
                .placeholder("Enter subject name here")
                .title("Subject name. Try to use abbreviations if the name is long, so that it fits in the time table."),
            new Button().id("add_button").populate("Add")
        ], { class: "inputs" });
    }
}

export default TimeTableInputs; 