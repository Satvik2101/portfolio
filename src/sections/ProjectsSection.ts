import Tag from "../../lucid/utils/Tag";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import Project from "../interface/Project";
import SimpleAnchor from "../../lucid/utils/SimpleAnchor";
import { AdaptiveHeading } from "../headings/AdaptiveHeading";

class ProjectEntry extends EnhancedDiv {
    constructor(project: Project) {
        super({
            class: "cli-project",
            children: [
                new EnhancedDiv({ class: "cli-name", children: project.name + (project.product ? "'s " + project.product : "") }),
                new EnhancedDiv({ class: "cli-meta", children: project.techstack.join(" · ") }),
                ...project.points.map(point =>
                    new EnhancedDiv({ class: "cli-exp-point", children: `- ${point}` })
                ),
                ...project.links.map(link =>
                    new EnhancedDiv({
                        class: "cli-link",
                        children: new SimpleAnchor({ href: link.url, linkText: `[${link.name}]` })
                    })
                )
            ]
        });
    }
}

class ProjectsSection extends Tag {
    constructor(projects: Project[]) {
        super("section", [
            new AdaptiveHeading("cat projects.txt", "Projects"),
            new EnhancedDiv({
                class: "cli-block",
                children: projects.map(p => new ProjectEntry(p))
            })
        ], { id: "projects" });
    }
}

export default ProjectsSection; 