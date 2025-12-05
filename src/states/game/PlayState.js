import State from "../../../lib/State.js";
import ImageName from "../../enums/ImageName.js";
import { canvas, images, timer } from "../../globals.js";
import Map from "../../services/Map.js";

/**
 * Represents the main play state of the game.
 *
 * @extends State
 */
export default class PlayState extends State {
    /**
     * Creates a new PlayState instance.
     *
     * @param {Object} mapDefinition - The definition object for the game map.
     */
    constructor(mapDefinition) {
        super();

        //The game map
        this.map = new Map(mapDefinition);

        //Loads background image
        this.backgroundImage = images.get(ImageName.Background);
    }

    /**
     * Updates the play state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        timer.update(dt);
        this.map.update(dt);
    }

    /**
     * Renders the play state.
     */
    render() {
        this.backgroundImage.render(0, 0, canvas.width, canvas.height);
        this.map.render();
    }
}
