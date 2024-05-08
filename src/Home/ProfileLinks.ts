import A from "../../lucid/tags/A";
import Span from "../../lucid/tags/Span";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import EnhancedImg from "../../lucid/utils/EnhancedImg";
import Tag from "../../lucid/utils/Tag";


class ProfileLinkIcon extends EnhancedImg {
    constructor(props: { src: string, alt: string, id?: string }) {
        super(props)
        this.class("profile_link_icon");
    }
}


class ProfileLinkButton extends A {
    constructor(props: { href: string, name: string, shortName: string, imgSrc?: string, customChild?: Tag }) {

        super()
        super.href(props.href)
            .class("profile_link_button")
            .id(`${props.shortName}_button`)
            .p([props.customChild ?
                props.customChild
                : new ProfileLinkIcon({
                    src: props.imgSrc as string,
                    alt: props.shortName,
                    id: props.shortName + "_icon"
                }),
            props.name,
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
        href: "https://www.satvikgupta.com/satvik-gupta-resume.pdf",
        shortName: "resume",
        name: "Resume",
        customChild: new Span().id("resume_icon"),
    }
]

class ProfileLinks extends EnhancedDiv {

    constructor() {
        super({
            id: "profile_links",
            children: ProfileLinksData.map((linkData) => new ProfileLinkButton(linkData)),
            class: "padded_centered"
        })
    }

}

export default ProfileLinks;