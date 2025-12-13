import {
    gokuSpriteConfig,
    vegetaSpriteConfig,
} from "../../../config/SpriteConfig.js";
import State from "../../../lib/State.js";
import Fighter from "../../entities/Fighter.js";
import ImageName from "../../enums/ImageName.js";
import {
    canvas,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    images,
    timer,
} from "../../globals.js";
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
        this.player1 = new Fighter(
            50,
            174,
            31,
            52,
            this.map,
            gokuSpriteConfig,
            ImageName.Goku,
            1
        );
        this.player2 = new Fighter(
            470,
            174,
            23,
            50,
            this.map,
            vegetaSpriteConfig,
            ImageName.Vegeta,
            2
        );

        //The health bars
        this.player1HealthBar = new HealthBar(
            50,
            20,
            150,
            10,
            Fighter.MAX_HEALTH,
            HealthBar.PLAYER1_LABEL
        );
        this.player2HealthBar = new HealthBar(
            360,
            20,
            150,
            10,
            Fighter.MAX_HEALTH,
            HealthBar.PLAYER2_LABEL
        );

        //Flag to prevent multiple hits at once
        this.isProcessingHit = false;
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

        //Checks if a hit is not being processed then checks for collisions
        if (!this.isProcessingHit) {
            this.checkAttackCollisions();
        }

        this.player1HealthBar.update(this.player1.health);
        this.player2HealthBar.update(this.player2.health);
    }

    /**
     * Renders the play state.
     *
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    render(context) {
        images.render(ImageName.Background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.map.render(context);

        this.player1.render(context);
        this.player2.render(context);

        this.player1HealthBar.render(context);
        this.player2HealthBar.render(context);
    }

    /**
     * Checks if either player's attack hitbox collides with the other player's body.
     */
    checkAttackCollisions() {
        //Checks if player2's attack hit player1's body
        if (this.player1.attackHitboxCollidesWith(this.player2)) {
            this.handleAttackHit(this.player1, this.player2);
        }
        //Checks if player2's attack hit player1's body
        if (this.player2.attackHitboxCollidesWith(this.player1)) {
            this.handleAttackHit(this.player2, this.player1);
        }
    }

    /**
     * Handles when an attack successfully lands.
     */
    handleAttackHit(attacker, victim) {
        this.isProcessingHit = true;

        //Deals damage to the victim
        victim.receiveDamage(50);

        //Waits a bit before allowing another hit
        timer.addTask(
            () => {},
            0,
            0.5,
            () => {
                this.isProcessingHit = false;
            }
        );
    }
}
