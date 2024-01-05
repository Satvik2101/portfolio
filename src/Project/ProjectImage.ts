import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import EnhancedImg from "../../lucid/utils/EnhancedImg";


class ProjectImage extends EnhancedDiv {
    constructor(props: { src: string | undefined, name: string, isEven: Boolean, alt?: string }) {
        if (props.alt === undefined) props.alt = props.name;
        if (props.src == undefined) {
            super({});
            return;
        }
        var style = "";
        var imgStyle = "";
        if (props.isEven) {

            style = "margin-left:0;margin-right:2em;"
            imgStyle = "float:right";
        } else {
            style = "margin-right:0;margin-left:2em;"
            imgStyle = "float:left";

        }

        super({
            class: "project_image",
            children: new EnhancedImg({ src: props.src, alt: props.alt }).style(imgStyle)
        });
        this.style(style);
    }
}

export default ProjectImage;