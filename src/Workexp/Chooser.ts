
import Button from "../../lucid/tags/Button";
import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import Workexp from "../interface/workexp";


class ChooserItem extends EnhancedDiv {

    constructor(companyShortName: string, idx: number) {

        var chooserClass = "workexp_chooser_item";
        if (idx == 0) chooserClass += " workexp_chooser_item_selected";
        super({ class: chooserClass, id: `workexp_chooser_item_${idx + 1}`, children: new Button(companyShortName) });
    }
}


class Chooser extends EnhancedDiv {
    constructor(props: Workexp[]) {
        super({ id: "workexp_chooser", children: props.map((workexp, idx) => new ChooserItem(workexp.shortName, idx)) });
    }
}

export default Chooser;