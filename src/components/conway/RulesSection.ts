import Tag from "../../../lucid/utils/Tag";
import Div from "../../../lucid/tags/Div";
import Button from "../../../lucid/tags/Button";
import H2 from "../../../lucid/tags/H2";
import Ol from "../../../lucid/tags/Ol";
import Li from "../../../lucid/tags/Li";
import Input from "../../../lucid/tags/Input";
import Label from "../../../lucid/tags/Label";
import Br from "../../../lucid/tags/Br";

class RulesSection extends Tag {
    constructor() {
        super("div", [
            new Button().id("toggle-button").populate("Start"),
            new H2("Rules"),
            new Ol([
                new Li("Any live cell with fewer than two live neighbours dies, as if by underpopulation."),
                new Li("Any live cell with two or three live neighbours lives on to the next generation."),
                new Li("Any live cell with more than three live neighbours dies, as if by overpopulation."),
                new Li("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.")
            ]),
            new Input().type("range").min("1").max("10").value("1").id("speed-slider"),
            new Label("Speed").for("speed-slider"),
            new Input().type("range").min("1").max("5").value("1").id("size-slider"),
            new Label("Size").for("size-slider"),
            new Br()
        ], { id: "rules" });
    }
}

export default RulesSection; 