import { FighterConfig } from "../../../config/FighterConfig.js";
import Input from "../../../lib/Input.js";
import Fighter from "../../entities/Fighter.js";
import FighterStateName from "../../enums/FighterStateName.js";
import { input } from "../../globals.js";
import FighterState from "./FighterState.js";

export default class FighterJumpingState extends FighterState {
    /**
     * Creates a new FighterJumpingState instance.
     *
     * @param {Fighter} fighter - The fighter object.
     */
    constructor(fighter) {
        super(fighter);
    }

    /**
     * Called when entering the jumping state.
     */
    enter() {
        this.fighter.velocity.y = FighterConfig.jumpPower;
        this.fighter.currentAnimation = this.fighter.animations.jump;
        this.fighter.currentAnimation.refresh();
    }

    /**
     * Called when exiting the jumping state.
     */
    exit() {}

    /**
     * Updates the jumping state.
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        super.update(dt);

        this.handleInput();
        this.handleHorizontalMovement();
        this.checkTransitions();
    }

    /**
     * Handles fighter input.
     */
    handleInput() {
        if (!input.isKeyHeld(Input.KEYS.SPACE) && this.fighter.velocity.y < 0) {
            this.fighter.velocity.y *= 0.5;
        }

        //If the player is pressing E, change to the attacking state
        if (input.isKeyPressed(Input.KEYS.E)) {
            this.fighter.stateMachine.change(FighterStateName.Attacking);
        }
    }

    /**
     * Checks for state transitions.
     */
    checkTransitions() {
        if (this.fighter.velocity.y >= 0) {
            this.fighter.stateMachine.change(FighterStateName.Falling);
        }
    }
}
