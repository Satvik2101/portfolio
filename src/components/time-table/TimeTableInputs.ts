import Tag from "@satvik2101/lucid/utils/Tag";
import Input from "@satvik2101/lucid/tags/Input";
import Button from "@satvik2101/lucid/tags/Button";

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