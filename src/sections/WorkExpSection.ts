import Tag from "@satvik2101/lucid/utils/Tag";
import EnhancedDiv from "@satvik2101/lucid/utils/EnhancedDiv";
import Workexp from "../models/workexp";
import SimpleAnchor from "@satvik2101/lucid/utils/SimpleAnchor";
import { AdaptiveHeading } from "../components/AdaptiveHeading";
import Button from "@satvik2101/lucid/tags/Button";

class WorkExpEntry extends EnhancedDiv {
    constructor(exp: Workexp, isHidden: boolean = false) {
        super({
            class: isHidden ? "cli-workexp workexp-hidden" : "cli-workexp",
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
        const filteredExperiences = experiences.filter(exp => exp.excluded !== true);
        const visibleExperiences = filteredExperiences.slice(0, 3);
        const hiddenExperiences = filteredExperiences.slice(3);
        const hasMore = hiddenExperiences.length > 0;

        const children: any[] = [
            new AdaptiveHeading("cat workexp.txt", "Work Experience"),
            ...visibleExperiences.map(exp => new WorkExpEntry(exp, false)),
            ...hiddenExperiences.map(exp => new WorkExpEntry(exp, true))
        ];

        if (hasMore) {
            children.push(
                new EnhancedDiv({
                    class: "workexp-show-all-container",
                    children: Button.withAttributes(
                        { id: "workexpShowAll", class: "workexp-show-all-button" },
                        "Show All"
                    )
                })
            );
        }

        super("section", children, { id: "workexp" });
    }
}

export default WorkExpSection; 