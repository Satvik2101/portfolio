import Div from "@satvik2101/lucid/tags/Div";

class TimeTableSlot extends Div {
    constructor(id: string) {
        super();
        this.contenteditable("true").class("tt-slot").id(id);
    }
}

export default TimeTableSlot; 