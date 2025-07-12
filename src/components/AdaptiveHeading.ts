import Span from "@satvik2101/lucid/tags/Span";
import Tag from "@satvik2101/lucid/utils/Tag";

export class AdaptiveHeading extends Tag {
    constructor(cliHeading: string, plainHeading: string, pre?: Tag) {
        super("H2", [
            pre ?? new Span(),
            Span.withAttributes({ class: "cli-mode" }, `~$ ${cliHeading}`),
            Span.withAttributes({ class: "plain-mode" }, plainHeading)
        ])
    }
} 