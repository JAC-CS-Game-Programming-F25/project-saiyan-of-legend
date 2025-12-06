import Sprite from "../lib/Sprite.js";

export const gokuSpriteConfig = {
    idle: [{ x: 212, y: 130, width: 31, height: 52 }],
    walk: [
        { x: 185, y: 212, width: 38, height: 43 },
        { x: 248, y: 218, width: 47, height: 37 },
    ],
    jump: [
        { x: 68, y: 289, width: 34, height: 50 },
        { x: 113, y: 277, width: 32, height: 60 },
    ],
    fall: [
        { x: 160, y: 278, width: 32, height: 45 },
        { x: 203, y: 279, width: 32, height: 60 },
        { x: 245, y: 276, width: 32, height: 60 },
    ],
};

export function loadFighterSprites(spriteSheet, spriteConfig) {
    const sprites = {};

    for (const [animationName, frames] of Object.entries(spriteConfig)) {
        sprites[animationName] = frames.map(
            (frame) =>
                new Sprite(
                    spriteSheet,
                    frame.x,
                    frame.y,
                    frame.width,
                    frame.height
                )
        );
    }

    return sprites;
}
