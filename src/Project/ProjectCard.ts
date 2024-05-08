
import H3 from "../../lucid/tags/H3";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import SimpleUnorderedList from "../../lucid/utils/SimpleUnorderedList";
import TechStack from "../global/TechStack";
import Project from "../interface/Project";
import ProjectImage from "./ProjectImage";
import ProjectLinks from "./ProjectLinks";

class ProjectPoints extends EnhancedDiv {
    constructor(props: { points: string[] }) {
        super({ class: "project_por_points", children: new SimpleUnorderedList(props.points) })
    }
}

class ProjectDetails extends EnhancedDiv {
    constructor(props: Project) {
        super({
            class: "project_details",
            children: [
                new EnhancedDiv({
                    class: "project_title", children: [
                        new H3().class("project_title_first").p(props.name),
                        props.product ? new H3().class("project_title_second").p(props.product) : "",
                    ]
                },),
                new ProjectLinks({ links: props.links }),
                props.role ? new EnhancedDiv({ class: "por_designation", children: props.role }) : "",
                new ProjectPoints({ points: props.points }),
                new TechStack(props.techstack),
            ]
        })
    }
}

class ProjectCard extends EnhancedDiv {
    constructor(props: { project: Project, isEven: Boolean }) {
        if (props.project.product != null) {
            props.project.name = props.project.name + "'s"
        }

        var style: string = "";
        if (props.isEven == true) {
            style = "flex-direction:row-reverse;";
        } else {
            style = "flex-direction:row;";
        }
        console.log(style)
        super({
            class: "project_card",
            children: [
                new ProjectDetails(props.project),
                props.project.image ? new ProjectImage({
                    src: props.project.image,

                    name: props.project.name,
                    alt: props.project.alt,
                    isEven: props.isEven
                }) : "",
            ],
        })
        this.style(style);
    }
}

export default ProjectCard;