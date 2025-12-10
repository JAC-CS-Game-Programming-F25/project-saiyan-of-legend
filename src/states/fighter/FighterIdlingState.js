import Input from "../../../lib/Input.js";
import Fighter from "../../entities/Fighter.js";
import FighterStateName from "../../enums/FighterStateName.js";
import { input } from "../../globals.js";
import FighterState from "./FighterState.js";

export default class FighterIdlingState extends FighterState {
    /**
     * Creates a new FighterIdlingState instance.
     *
     * @param {Fighter} fighter - The fighter object.
     */
    constructor(fighter) {
        super(fighter);
    }

    /**
     * Called when entering the idling state.
     */
    enter() {
        this.fighter.velocity.x = 0;
        this.fighter.velocity.y = 0;
        this.fighter.currentAnimation = this.fighter.animations.idle;

        this.fighter.dimensions.x = 31;
        this.fighter.dimensions.y = 52;
    }

    /**
     * Updates the idling state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        super.update(dt);
        this.handleInput();
    }

    /**
     * Handles fighter input.
     */
    handleInput() {
        //If the fighter is pressing space, change to the jumping state
        if (input.isKeyPressed(Input.KEYS.SPACE)) {
            this.fighter.stateMachine.change(FighterStateName.Jumping);
        }
        //If the player is pressing A or D, not both, change to the walking state
        if (input.isKeyHeld(Input.KEYS.A) !== input.isKeyHeld(Input.KEYS.D)) {
            this.fighter.stateMachine.change(FighterStateName.Walking);
        }
        //If the player is pressing E, change to the attacking state
        if (input.isKeyPressed(Input.KEYS.E)) {
            this.fighter.stateMachine.change(FighterStateName.Attacking);
        }
    }
}
