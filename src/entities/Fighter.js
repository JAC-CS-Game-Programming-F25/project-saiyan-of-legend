import {
    gokuSpriteConfig,
    loadFighterSprites,
    vegetaSpriteConfig,
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
import FighterWalkingState from "../states/fighter/FighterWalkingState.js";
import FighterJumpingState from "../states/fighter/FighterJumpingState.js";
import FighterFallingState from "../states/fighter/FighterFallingState.js";
import FighterAttackingState from "../states/fighter/FighterAttackingState.js";

export default class Fighter extends Entity {
    static MAX_HEALTH = 100;

    /**
     * Creates a new Fighter instance.
     *
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     * @param {number} width - The width of the fighter.
     * @param {number} height - The height of the fighter.
     * @param {Map} map - The game map instance.
     * @param {number} playerId - The player number.
     */
    constructor(x, y, width, height, map, playerNumber) {
        super(x, y, width, height);

        this.initialPosition = new Vector(x, y);
        this.position = new Vector(x, y);
        this.dimensions = new Vector(width, height);
        this.velocity = new Vector(0, 0);
        this.map = map;
        this.health = Fighter.MAX_HEALTH;
        this.playerNumber = playerNumber;

        if (playerNumber === 1) {
            //Loads the goku sprites
            this.sprites = loadFighterSprites(
                images.get(ImageName.Goku),
                gokuSpriteConfig
            );
            this.facingRight = true;
        } else {
            //Loads the vegeta sprites
            this.sprites = loadFighterSprites(
                images.get(ImageName.Vegeta),
                vegetaSpriteConfig
            );
            this.facingRight = false;
        }

        //Updates the fighter's animations
        this.updateAnimations();

        //Sets the fighter's current animation to idle
        this.currentAnimation = this.animations.idle;

        //Initialize state machine for fighter behavior
        this.stateMachine = new StateMachine();

        //Add states to the state machine
        this.stateMachine.add(
            FighterStateName.Falling,
            new FighterFallingState(this)
        );
        this.stateMachine.add(
            FighterStateName.Jumping,
            new FighterJumpingState(this)
        );
        this.stateMachine.add(
            FighterStateName.Walking,
            new FighterWalkingState(this)
        );
        this.stateMachine.add(
            FighterStateName.Attacking,
            new FighterAttackingState(this)
        );
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
            walk: new Animation(this.sprites.walk, 0.5, 1),
            jump: new Animation(this.sprites.jump, 0.15, 1),
            fall: new Animation(this.sprites.fall, 0.5, 1),
            attack: new Animation(this.sprites.attack, 0.1, 1),
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
