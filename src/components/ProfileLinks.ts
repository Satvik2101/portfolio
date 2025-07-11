import EnhancedDiv from "@satvik2101/lucid/utils/EnhancedDiv";
import SimpleAnchor from "@satvik2101/lucid/utils/SimpleAnchor";
import Tag from "@satvik2101/lucid/utils/Tag";


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
    },
    {
        href: "https://www.linkedin.com/in/satvik-g/",
        shortName: "linkedin",
        name: "LinkedIn",
    },
    {
        href: "https://www.satvikgupta.com/resume.pdf",
        shortName: "resume",
        name: "Resume",
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