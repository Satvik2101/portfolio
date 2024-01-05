import Div from "../../lucid/tags/Div";

class BorderMask extends Div {
    //divClass: "border_mask", 
    constructor() {
        super(
            [
                new Div().id("mask_top"),
                new Div().id("mask_right"),
                new Div().id("mask_bottom"),
                new Div().id("mask_left"),
            ]
        );
    };
}

export default BorderMask;