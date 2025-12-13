import FighterStateName from "../../enums/FighterStateName.js";
import { timer } from "../../globals.js";
import FighterState from "./FighterState.js";

/**
 * The state where a fighter plays their death animation
 * and then the game transitions back to the title screen.
 */
export default class FighterDyingState extends FighterState {
    constructor(fighter) {
        super(fighter);
    }

    enter() {
        this.fighter.currentAnimation = this.fighter.animations.death;
        this.fighter.currentAnimation.refresh();

        //Stops all movement
        this.fighter.velocity.x = 0;
        this.fighter.velocity.y = 0;

        //Prevent any further damage
        this.fighter.isInvincible = true;

        this.fighter.setDimensionsForAnimation("death", 0);
    }

    update(dt) {
        super.update(dt);

        if (this.fighter.currentAnimation.isHalfwayDone()) {
            this.fighter.setDimensionsForAnimation("death", 1);
            this.fighter.position.y += 10;
        }

        //Checks if animation is done and sets the fighter to dead
        if (this.fighter.currentAnimation.isDone()) {
            this.fighter.isDead = true;
        }
    }
}
