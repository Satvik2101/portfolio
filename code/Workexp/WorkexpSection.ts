
import WorkexpCard from "./WorkexpCard";
import Chooser from "./Chooser";
import Workexp from "../interface/workexp";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import H2 from "../../lucid/tags/H2";
import Span from "../../lucid/tags/Span";



class WorkexpSection extends EnhancedDiv {
    constructor(workexp: Workexp[]) {
        super({
            class: "section", id: "workexp", children: [
                new EnhancedDiv({
                    id: "workexp_section_start", children: [
                        new H2().class("section_title").p(["Where I've Worked",
                            new Span().class("separator_line").p(""),
                        ]),
                        "I've been lucky enough to be able to work for some amazing companies and organizations. Here are some of them."
                    ]
                }), //workexp_section_start
                new EnhancedDiv({
                    id: "workexp_cards_container",
                    children: [
                        new Chooser(workexp),
                        ...workexp.map((workexp, idx) => new WorkexpCard(workexp, idx))
                    ]
                }),
            ]
        });
    }
}

export default WorkexpSection