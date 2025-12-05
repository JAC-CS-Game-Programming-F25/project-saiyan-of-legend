import Fighter from "../../entities/Fighter.js";

export default class FighterIdlingState extends Fighter {
    /**
     * Creates a new FighterIdlingState instance.
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
    }

    /**
     * Updates the idling state.
     *
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        super.update(dt);
    }
}
