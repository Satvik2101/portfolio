import A from "../../lucid/tags/A";
import Span from "../../lucid/tags/Span";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import SimpleAnchor from "../../lucid/utils/SimpleAnchor";
import Tag from "../../lucid/utils/Tag";


class ProfileLinkButton extends Tag {
    constructor(props: { href: string, name: string, shortName: string }, separator: boolean) {

        super("span")
        super
            .class("profile_link_button")
            .id(`${props.shortName}_button`)
            .p([
                new SimpleAnchor({ href: props.href, linkText: props.name }).class("plain-mode"),
                new SimpleAnchor({ href: props.href, linkText: props.shortName }).class("cli-mode"),

                separator ? " | " : ""
            ])
    }
}

const ProfileLinksData = [
    {
        href: "https://www.github.com/Satvik2101",
        shortName: "github",
        name: "GitHub",
        imgSrc: "./images/github_icon_2.png",
    },
    {
        href: "https://www.linkedin.com/in/satvik-g/",
        shortName: "linkedin",
        name: "LinkedIn",
        imgSrc: "./images/linkedin_icon_circular.png",
    },
    {
        href: "https://www.satvikgupta.com/resume.pdf",
        shortName: "resume",
        name: "Resume",
        customChild: new Span().id("resume_icon"),
    }
]

class ProfileLinks extends EnhancedDiv {

    constructor() {
        super({
            id: "profile_links",
            children: ProfileLinksData.map((linkData, idx) => new ProfileLinkButton(linkData, idx != ProfileLinksData.length - 1),),
            class: "padded_centered"
        })
    }

}

export default ProfileLinks;