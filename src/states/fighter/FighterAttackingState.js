import Fighter from "../../entities/Fighter.js";
import FighterStateName from "../../enums/FighterStateName.js";
import FighterState from "./FighterState.js";

export default class FighterAttackingState extends FighterState {
    /**
     * Creates a new FighterAttackingState instance.
     *
     * @param {Fighter} fighter - The fighter object.
     */
    constructor(fighter) {
        super(fighter);
    }

    /**
     * Called when entering the attacking state.
     */
    enter() {
        this.fighter.currentAnimation = this.fighter.animations.attack;
        this.fighter.currentAnimation.refresh();

        this.fighter.dimensions.x = 43;
        this.fighter.dimensions.y = 48;

        this.fighter.position.y += 5;
    }

    /**
     * Updates the attacking state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        super.update(dt);

        if (this.fighter.currentAnimation.isDone()) {
            if (this.fighter.isOnGround) {
                this.fighter.stateMachine.change(FighterStateName.Idling);
            } else {
                this.fighter.stateMachine.change(FighterStateName.Falling);
            }
        }
    }
}
