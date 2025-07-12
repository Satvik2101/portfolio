import Tag from "@satvik2101/lucid/utils/Tag";
import Td from "@satvik2101/lucid/tags/Td";
import TimeTableSlot from "./TimeTableSlot";

class TimeTableRow extends Tag {
    constructor(dayName: string, dayAbbr: string) {
        const slots = [];
        for (let i = 1; i <= 10; i++) {
            slots.push(new Td([new TimeTableSlot(`${dayAbbr}-${i}`)]));
        }

        super("tr", [
            Td.withAttributes({ class: "day-name" }, dayName),
            ...slots
        ]);
    }
}

export default TimeTableRow; 