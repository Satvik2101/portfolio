import A from "@satvik2101/lucid/tags/A";
import Tag from "@satvik2101/lucid/utils/Tag";
import { AdaptiveHeading } from "../components/AdaptiveHeading";

export class NavigateTo extends A {
    constructor(props: { href: string; cliText: string; plainText: string, iconClass: string, target?: string }) {
        super([
            new AdaptiveHeading(props.cliText, props.plainText, new Tag("i").setAttr("class", props.iconClass).style("padding-right:12px"))
        ]);
        this.href(props.href);
        this.target(props.target ?? "_self")
    }
} 