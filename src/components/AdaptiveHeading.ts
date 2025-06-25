import H2 from "../../lucid/tags/H2";
import Span from "../../lucid/tags/Span";
import Tag from "../../lucid/utils/Tag";

export class AdaptiveHeading extends Tag {
    constructor(cliHeading: string, plainHeading: string, pre?: Tag) {
        super("H2", [
            pre ?? new Span(),
            Span.withAttributes({ class: "cli-mode" }, `~$ ${cliHeading}`),
            Span.withAttributes({ class: "plain-mode" }, plainHeading)
        ])
    }
} 