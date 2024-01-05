import EnhancedDiv from "../../lucid/utils/EnhancedDiv";
import Bio from "./Bio";
import NameAndDesignation from "./NameAndDesignation";
import ProfileLinks from "./ProfileLinks";

class Home extends EnhancedDiv {
    constructor() {
        super({
            id: "home",
            children: [
                new EnhancedDiv({
                    id: "home_section",
                    children: [
                        new NameAndDesignation(),
                        new Bio(),
                        new ProfileLinks(),
                    ]
                })
            ]
        })
    }
}

export default Home;