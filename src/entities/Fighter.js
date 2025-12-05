import {
    gokuSpriteConfig,
    loadFighterSprites,
} from "../../config/SpriteConfig.js";
import Map from "../services/Map.js";
import StateMachine from "../../lib/StateMachine.js";
import Animation from "../../lib/Animation.js";
import { images } from "../globals.js";
import ImageName from "../enums/ImageName.js";
import FighterStateName from "../enums/FighterStateName.js";
import Entity from "./Entity.js";
import Vector from "../../lib/Vector.js";
import FighterIdlingState from "../states/fighter/FighterIdlingState.js";

export default class Fighter extends Entity {
    /**
     * Creates a new Fighter instance.
     *
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {number} width - The width of the fighter.
     * @param {number} height - The height of the fighter.
     * @param {Map} map - The game map instance.
     */
    constructor(x, y, width, height, map) {
        super(x, y, width, height);

        this.initialPosition = new Vector(x, y);
        this.position = new Vector(x, y);
        this.dimensions = new Vector(width, height);
        this.velocity = new Vector(0, 0);
        this.map = map;
        this.facingRight = true;

        //Loads the goku sprites
        this.sprites = loadFighterSprites(
            images.get(ImageName.Goku),
            gokuSpriteConfig
        );

        //Updates the fighter's animations
        this.updateAnimations();

        //Sets the fighter's current animation to idle
        this.currentAnimation = this.animations.idle;

        //Initialize state machine for fighter behavior
        this.stateMachine = new StateMachine();

        //Add states to the state machine
        this.stateMachine.add(
            FighterStateName.Idling,
            new FighterIdlingState(this)
        );
    }

    /**
     * Updates the animations for different fighter states
     */
    updateAnimations() {
        //Creates animations for different fighter states
        this.animations = {
            idle: new Animation(this.sprites.idle),
        };
    }

    /**
     * Updates the fighter's state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        this.stateMachine.update(dt);
    }

    /**
     * Renders the fighter.
     *
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    render(context) {
        this.stateMachine.render(context);
    }
}
