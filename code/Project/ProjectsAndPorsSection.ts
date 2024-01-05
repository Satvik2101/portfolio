
import Br from "../../lucid/tags/Br";
import H2 from "../../lucid/tags/H2";
import Span from "../../lucid/tags/Span";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import Project from "../interface/Project";
import ProjectCard from "./ProjectCard";

class ProjectsSectionStart extends EnhancedDiv {
    constructor() {
        super({
            id: "projects_section_start",
            children: [
                new H2().class("section_title").p(["What I've Created",
                    new Span().class("separator_line").p(""),
                ]),
                "I've worked on a lot of projects, both personal and professional, and have held Positions of Responsibility as a student.",
                new Br(),
                "Here are some of them."
            ]

        })
    }
}

class ProjectsAndPorsSection extends EnhancedDiv {
    constructor(props: { projects: Project[], pors: Project[] }) {
        const totalProjects = [...props.pors, ...props.projects]
        super({
            id: "projects",
            class: "section",
            children: [
                new ProjectsSectionStart(),
                new EnhancedDiv({
                    id: "projects_and_pors_cards_and_description",
                    children: totalProjects.map(
                        (project, index) => new ProjectCard({
                            project: project, isEven: index % 2 == 0
                        })
                    )
                })
            ]
        })
    }
}

export default ProjectsAndPorsSection;