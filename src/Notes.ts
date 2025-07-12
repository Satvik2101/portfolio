import Tag from "@satvik2101/lucid/utils/Tag";
import Ul from "@satvik2101/lucid/tags/Ul";
import Li from "@satvik2101/lucid/tags/Li"
import { DefaultHeader, PortfolioHead } from "./components/PortfolioHead";


import H1 from "@satvik2101/lucid/tags/H1";
import Br from "@satvik2101/lucid/tags/Br";
import SimpleAnchor from "@satvik2101/lucid/utils/SimpleAnchor";

const notes = [
    { "url": "CN", "name": "Computer Networks" },
    { "url": "DiS", "name": "Distributed Systems" },
    { "url": "RL", "name": "Reinforcement Learning" }
]

class Notes extends Tag {
    constructor() {
        super("html", [

            new PortfolioHead({
                title: "Satvik Gupta - Notes",
                description: "I'm Satvik Gupta, a Software Developer. This page contains notes of various subjects that I have compiled and created over the years",
                image: "https://www.satvikgupta.com/assets/images/preview.png",
                url: "https://www.satvikgupta.com/notes",
                stylesheets: [
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                    "/styles.css"
                ],

            }),
            new Tag("body", [
                new H1("Notes by Satvik Gupta"),
                "These are notes that I have compiled over the years. They are not perfect, but they are good enough to get you started. I have tried to make them as concise but complete as possible. If you find any errors, please let me know. I will be happy to fix them.",
                new Br(),
                new Br(),
                new Ul(
                    notes.map((note) => new Li(
                        new SimpleAnchor({ href: `/notes/${note.url}`, linkText: note.name })
                    ))
                )

            ])
        ], { lang: "en", ontouchmove: "" })
    }

    getStart(): string {
        return `<!DOCTYPE html>` + "\n" + super.getStart();
    }
}

export default Notes;