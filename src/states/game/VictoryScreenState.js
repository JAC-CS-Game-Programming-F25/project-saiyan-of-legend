import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import GameStateName from "../../enums/GameStateName.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    images,
    input,
    stateMachine,
} from "../../globals.js";
import Input from "../../../lib/Input.js";
import Colour from "../../enums/Colour.js";

export default class VictoryScreenState extends State {
    constructor() {
        super();
        this.winnerName = "";
        this.winnerNumber = 0;
    }

    enter(params) {
        this.winnerName = params.winnerName;
        this.winnerNumber = params.winnerNumber;

        //sounds.play
    }

    exit() {
        // sounds.stop
    }

    update() {
        if (input.isKeyPressed(Input.KEYS.ENTER)) {
            stateMachine.change(GameStateName.TitleScreen);
        }

        if (input.isKeyPressed(Input.KEYS.F)) {
            stateMachine.change(GameStateName.Play);
        }
    }

    render(context) {
        //Renders the play state background
        images.render(ImageName.Background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        //Dims the background
        context.fillStyle = "rgba(0, 0, 0, 0.6)";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        context.save();
        context.textAlign = "center";
        context.textBaseline = "middle";

        //Displays the winner
        context.font = "24px PressStart2P";
        context.fillStyle = Colour.Gold;
        context.fillText(
            `P${this.winnerNumber}: ${this.winnerName.toUpperCase()}`,
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2 - 40
        );
        context.fillText("WINS", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

        //Displays "Press F for Rematch"
        context.font = "14px PressStart2P";
        context.fillStyle = Colour.White;
        context.fillText(
            "Press F To Rematch",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT - 80
        );

        //Displays "Press Enter for Title"
        context.fillText(
            "Press Enter To Return To Title",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT - 50
        );

        context.restore();
    }
}
