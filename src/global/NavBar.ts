import Div from "../../lucid/tags/Div";
import I from "../../lucid/tags/I";
import SimpleAnchor from "../../lucid/utils/SimpleAnchor";

interface NavbarLinkInterface {
    name: string;
    short: string;
    pre?: string;
}
var navbarLinksList: NavbarLinkInterface[] = [
    {
        name: "Home",
        short: "home",
    },
    {
        name: "Work",
        short: "more",
        pre: "/"
    },
    {
        name: "Notes",
        short: "notes",
        pre: "/"
    },

]

class NavbarLink extends Div {
    constructor(props: NavbarLinkInterface) {
        super(
            new SimpleAnchor({ href: `${props.pre ?? "#"}${props.short}`, linkText: props.name }).target("_self")
        )
        super.class("navbar_link")
        super.id(`${props.short}_link`)
    }
}

class NavbarLinks extends Div {
    constructor(links: NavbarLinkInterface[]) {
        super(
            links.map((link) => new NavbarLink(link))
        )
        super.id("navbar_links")
    }
}

class Navbar extends Div {
    constructor() {
        super(
            [
                new Div(
                    [
                        "satvik",
                        new I().id("dropdown-arrow").class("fa-solid fa-caret-down fa-xs"),
                    ]
                ).id("navbar_text"),
                new NavbarLinks(navbarLinksList)
            ]
        )
        super.id("navbar");
        super.on("click", " ");
    }
}

export default Navbar;