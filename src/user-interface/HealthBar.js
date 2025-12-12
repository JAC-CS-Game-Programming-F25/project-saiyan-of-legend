import { roundedRectangle } from "../../lib/Drawing.js";
import Vector from "../../lib/Vector.js";
import Colour from "../enums/Colour.js";
import Tile from "../services/Tile.js";

export default class HealthBar {
    static PLAYER1_LABEL = "P1";
    static PLAYER2_LABEL = "P2";

    /**
     * Constructs a new HealthBar
     * @param {number} x - The x position of the HealthBar.
     * @param {number} y - The y position of the HealthBar.
     * @param {number} width - The width of the HealthBar.
     * @param {number} height - The height of the HealthBar.
     * @param {number} maxValue - The maximum value of the HealthBar.
     * @param {string} label - The label of the HealthBar.
     */
    constructor(x, y, width, height, maxValue, label) {
        this.position = new Vector(x * Tile.SIZE, y * Tile.SIZE);
        this.dimensions = new Vector(width * Tile.SIZE, height * Tile.SIZE);

        //Sets position and dimensions
        this.position.x = x;
        this.position.y = y;
        this.dimensions.x = width;
        this.dimensions.y = height;

        //Sets current and max values
        this.currentValue = maxValue;
        this.maxValue = maxValue;

        //Sets label
        this.label = label;
    }

    /**
     * Updates the current value of the HealthBar to the given value.
     * @param {number} currentValue - The new current value of the HealthBar.
     */
    update(currentValue) {
        //Sets current value making sure it is between 0 and max
        this.currentValue = Math.max(0, Math.min(currentValue, this.maxValue));
    }

    /**
     * Renders the HealthBar with different colours depending on if it is a health bar or not.
     */
    render(context) {
        //Calculates the percentage bar is currently filled
        const percentage = this.currentValue / this.maxValue;
        const fillWidth = this.dimensions.x * percentage;

        context.save();

        context.fillStyle = Colour.White;
        context.font = `13px PressStart2P`;
        context.textBaseline = "middle";

        if (this.label === HealthBar.PLAYER1_LABEL) {
            context.fillText(
                this.label,
                this.position.x - this.dimensions.x + 110,
                this.position.y + this.dimensions.y / 2
            );
        } else if (this.label === HealthBar.PLAYER2_LABEL) {
            context.fillText(
                this.label,
                this.position.x + this.dimensions.x + 15,
                this.position.y + this.dimensions.y / 2
            );
        }

        //Draws a white background rectangle
        roundedRectangle(
            context,
            this.position.x,
            this.position.y,
            this.dimensions.x,
            this.dimensions.y,
            3,
            true,
            false
        );

        //Get the colour of the bar
        let barColour;
        if (percentage > 0.5) {
            barColour = Colour.Green;
        } else if (percentage > 0.25) {
            barColour = Colour.Yellow;
        } else {
            barColour = Colour.Red;
        }

        //Draws rectangle that has the increasing or decreasing colour
        context.fillStyle = barColour;
        context.fillRect(
            this.position.x,
            this.position.y,
            fillWidth,
            this.dimensions.y
        );

        //Draws outline rectangle
        context.lineWidth = 2;
        roundedRectangle(
            context,
            this.position.x,
            this.position.y,
            this.dimensions.x,
            this.dimensions.y,
            3,
            false,
            true
        );

        context.restore();
    }
}
