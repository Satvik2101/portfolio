import Tag from "@satvik2101/lucid/utils/Tag";
import EnhancedDiv from "@satvik2101/lucid/utils/EnhancedDiv";
import Workexp from "../models/workexp";
import SimpleAnchor from "@satvik2101/lucid/utils/SimpleAnchor";
import { AdaptiveHeading } from "../components/AdaptiveHeading";

class WorkExpEntry extends EnhancedDiv {
    constructor(exp: Workexp) {
        super({
            class: "cli-workexp",
            children: [
                new EnhancedDiv({ class: "cli-exp-header", children: `${exp.role} @ ${exp.shortName}` }),
                new EnhancedDiv({ class: "cli-exp-dates", children: `${exp.start} – ${exp.end}` }),
                new EnhancedDiv({ class: "cli-meta", children: exp.techstack.join(" · ") }),
                ...exp.points.map(point =>
                    new EnhancedDiv({ class: "cli-exp-point", children: `- ${point}` })
                ),
                ...(exp.links ? ((exp.links).map(link =>
                    new EnhancedDiv({
                        class: "cli-link",
                        children: new SimpleAnchor({ href: link.url, linkText: `[${link.name}]` })
                    })
                )) : [])
            ]
        });
    }
}

class WorkExpSection extends Tag {
    constructor(experiences: Workexp[]) {
        super("section", [
            new AdaptiveHeading("cat workexp.txt", "Work Experience"),
            ...experiences
                .filter(exp => exp.excluded !== true)
                .map(exp => new WorkExpEntry(exp))
        ], { id: "workexp" });
    }
}

export default WorkExpSection; 