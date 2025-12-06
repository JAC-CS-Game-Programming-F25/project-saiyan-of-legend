import Sprite from "../lib/Sprite.js";

export const gokuSpriteConfig = {
    idle: [{ x: 212, y: 100, width: 34, height: 90 }],
    walk: [
        { x: 185, y: 212, width: 38, height: 43 },
        { x: 248, y: 218, width: 47, height: 37 },
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
