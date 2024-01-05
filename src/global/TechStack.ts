import Div from "../../lucid/tags/Div";

class TechStackItem extends Div {
    constructor(techStackName: string) {
        var techStackClass = "tech_stack_item";
        super(techStackName);
        this.class(techStackClass);
    }
}

class TechStack extends Div {
    constructor(props: string[]) {
        super(props.map((techStackName) => new TechStackItem(techStackName)));
        super.class("tech_stack");

    }
}

export default TechStack;