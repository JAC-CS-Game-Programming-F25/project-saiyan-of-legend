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
    attack: [
        { x: 217, y: 445, width: 39, height: 48 },
        { x: 265, y: 445, width: 43, height: 48 },
        { x: 217, y: 445, width: 39, height: 48 },
        { x: 165, y: 446, width: 46, height: 47 },
        {},
    ],
};

export const vegetaSpriteConfig = {
    idle: [{ x: 181, y: 132, width: 23, height: 50 }],
    walk: [
        { x: 123, y: 208, width: 36, height: 43 },
        { x: 193, y: 218, width: 54, height: 33 },
    ],
    jump: [
        { x: 68, y: 280, width: 28, height: 46 },
        { x: 111, y: 274, width: 30, height: 52 },
    ],
    fall: [
        { x: 156, y: 274, width: 32, height: 46 },
        { x: 202, y: 276, width: 29, height: 50 },
        { x: 247, y: 270, width: 26, height: 56 },
    ],
    attack: [
        { x: 204, y: 438, width: 33, height: 44 },
        { x: 247, y: 436, width: 41, height: 46 },
        { x: 296, y: 436, width: 41, height: 46 },
        {},
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
