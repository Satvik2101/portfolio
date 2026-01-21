import Tag from "@satvik2101/lucid/utils/Tag";
import Ul from "@satvik2101/lucid/tags/Ul";
import Li from "@satvik2101/lucid/tags/Li"
import { PortfolioHead } from "./components/PortfolioHead";


import H1 from "@satvik2101/lucid/tags/H1";
import Br from "@satvik2101/lucid/tags/Br";
import SimpleAnchor from "@satvik2101/lucid/utils/SimpleAnchor";

const notes = [
    { "url": "exercised", "name": "Exercised (Daniel Lieberman)" },
    { "url": "linchpin", "name": "Linchpin" },
    { "url": "the-courage-to-be-disliked", "name": "The Courage to Be Disliked" },
    { "url": "pragmatic-programmer", "name": "The Pragmatic Programmer" }
]

class BookNotes extends Tag {
    constructor() {
        super("html", [

            new PortfolioHead({
                title: "Satvik Gupta - Notes",
                description: "I'm Satvik Gupta, a Software Developer. This page contains notes of some books I've read over the years. It includes quotes and key takeaways.",
                url: "https://www.satvikgupta.com/book-notes",
                stylesheets: [
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                    "styles.css",
                ]
            }),
            new Tag("body", [
                new H1("Book Notes by Satvik Gupta"),
                "I'm Satvik Gupta, a Software Developer. This page contains notes of some books I've read over the years. It includes quotes and key takeaways.",
                new Br(),
                new Br(),
                new Ul(
                    notes.map((note) => new Li(
                        new SimpleAnchor({ href: `/book-notes/${note.url}`, linkText: note.name })
                    ))
                )

            ])
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default BookNotes;