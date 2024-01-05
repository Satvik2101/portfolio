import H1 from "../../lucid/tags/H1";
import P from "../../lucid/tags/P";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";

class NameAndDesignation extends EnhancedDiv {
    constructor() {
        super({
            id: "name_and_desig",
            class: "padded_centered",
            children: [
                new H1().id("name_heading").p("> Hi. I'm Satvik Gupta."),
                new P().id("designation").p("Software Developer"),
            ]
        });
    }
}

export default NameAndDesignation;