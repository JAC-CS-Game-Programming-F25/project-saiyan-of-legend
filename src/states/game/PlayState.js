import State from "../../../lib/State.js";
import Fighter from "../../entities/Fighter.js";
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

        //The fighter
        this.fighter1 = new Fighter(50, 174, 31, 52, this.map, 1);

        this.fighter2 = new Fighter(470, 174, 23, 50, this.map, 2);

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
        this.fighter1.update(dt);
        this.fighter2.update(dt);
    }

    /**
     * Renders the play state.
     *
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    render(context) {
        this.backgroundImage.render(0, 0, canvas.width, canvas.height);
        this.map.render(context);
        this.fighter1.render(context);
        this.fighter2.render(context);
    }
}
