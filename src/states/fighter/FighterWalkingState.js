import { input } from "../../globals.js";
import Input from "../../../lib/Input.js";
import FighterState from "./FighterState.js";
import Fighter from "../../entities/Fighter.js";
import FighterStateName from "../../enums/FighterStateName.js";

export default class FighterWalkingState extends FighterState {
    /**
     * Creates a new FighterWalkingState instance.
     * @param {Fighter} fighter - The player object.
     */
    constructor(fighter) {
        super(fighter);
        this.isMovingRight = false;
        this.isMovingLeft = false;
    }

    /**
     * Called when entering the walking state.
     */
    enter() {
        this.fighter.isOnGround = true;
        this.fighter.currentAnimation = this.fighter.animations.walk;
        this.fighter.currentAnimation.refresh();

        this.fighter.dimensions.x = 47;
    }

    /**
     * Updates the walking state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        super.update(dt);
        this.checkTransitions();
        this.handleInput();
        this.handleHorizontalMovement();
    }

    /**
     * Handles player input.
     */
    handleInput() {
        if (input.isKeyHeld(Input.KEYS.A) && !this.isMovingRight) {
            this.isMovingLeft = true;
        } else {
            this.isMovingLeft = false;
        }
        if (input.isKeyHeld(Input.KEYS.D) && !this.isMovingLeft) {
            this.isMovingRight = true;
        } else {
            this.isMovingRight = false;
        }
        if (input.isKeyPressed(Input.KEYS.SPACE)) {
            this.fighter.stateMachine.change(FighterStateName.Jumping);
        }
        if (input.isKeyPressed(Input.KEYS.E)) {
            this.fighter.stateMachine.change(FighterStateName.Attacking);
        }
    }

    /**
     * Checks for state transitions.
     */
    checkTransitions() {
        if (this.shouldIdle()) {
            this.fighter.stateMachine.change(FighterStateName.Idling);
        }

        if (!this.fighter.isOnGround) {
            if (this.fighter.velocity.y < 0) {
                this.fighter.stateMachine.change(FighterStateName.Jumping);
            } else {
                this.fighter.stateMachine.change(FighterStateName.Falling);
            }
        }
    }

    /**
     * Determines if the player should transition to the idling state.
     *
     * @returns {boolean} True if the player should idle, false otherwise.
     */
    shouldIdle() {
        return (
            !this.isMovingLeft &&
            !this.isMovingRight &&
            Math.abs(this.fighter.velocity.x) < 0.1
        );
    }
}
