import State from "../../../lib/State.js";
import Fighter from "../../entities/Fighter.js";
import ImageName from "../../enums/ImageName.js";
import { canvas, images, timer } from "../../globals.js";
import Map from "../../services/Map.js";
import HealthBar from "../../user-interface/HealthBar.js";

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

        //The fighters
        this.player1 = new Fighter(50, 174, 31, 52, this.map, 1);
        this.player2 = new Fighter(470, 174, 23, 50, this.map, 2);

        //The health bars
        this.player1HealthBar = new HealthBar(
            20,
            20,
            150,
            10,
            Fighter.MAX_HEALTH
        );
        this.player2HealthBar = new HealthBar(
            390,
            20,
            150,
            10,
            Fighter.MAX_HEALTH
        );

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

        this.player1.update(dt);
        this.player2.update(dt);

        this.player1HealthBar.update(this.player1.health);
        this.player2HealthBar.update(this.player2.health);
    }

    /**
     * Renders the play state.
     *
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    render(context) {
        this.backgroundImage.render(0, 0, canvas.width, canvas.height);
        this.map.render(context);

        this.player1.render(context);
        this.player2.render(context);

        this.player1HealthBar.render(context);
        this.player2HealthBar.render(context);
    }
}
