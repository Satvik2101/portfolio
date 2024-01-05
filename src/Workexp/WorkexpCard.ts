
import TechStack from "../global/TechStack";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import { SimpleUnorderedList } from "../../lucid/utils/List";
import Workexp from "../interface/workexp";
import H3 from "../../lucid/tags/H3";
import H4 from "../../lucid/tags/H4";


class WorkexpPoints extends EnhancedDiv {
    constructor(props: { points: string[], techstack: string[] }) {

        super({
            class: "workexp_points", children: [
                new SimpleUnorderedList(props.points),
                new TechStack(props.techstack)
            ]
        });
    }
}

class WorkexpCard extends EnhancedDiv {
    constructor(props: Workexp, idx: number) {
        var workexpCardClass = "workexp_card";
        if (idx == 0) workexpCardClass += " workexp_card_selected";

        super({
            class: workexpCardClass, children: [
                new H3().class("workexp_title").p(props.company),
                new H4().class("workexp_subtitle").p(props.role),
                new H4().class("workexp_timespan").p(props.start + " - " + props.end),
                new WorkexpPoints({ points: props.points, techstack: props.techstack })
            ]
        });
    }
}

export default WorkexpCard;