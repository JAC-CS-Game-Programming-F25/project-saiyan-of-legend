import Input from "../../lib/Input.js";

export const PlayerControls = {
    1: {
        moveLeft: Input.KEYS.A,
        moveRight: Input.KEYS.D,
        jump: Input.KEYS.W,
        moveDown: Input.KEYS.S,
        attack: Input.KEYS.E,
        block: Input.KEYS.Q,
        special1: Input.KEYS[1],
        special2: Input.KEYS[2],
        special3: Input.KEYS[3],
    },
    2: {
        moveLeft: Input.KEYS.J,
        moveRight: Input.KEYS.L,
        jump: Input.KEYS.I,
        moveDown: Input.KEYS.K,
        attack: Input.KEYS.O,
        block: Input.KEYS.U,
        special1: Input.KEYS[7],
        special2: Input.KEYS[8],
        special3: Input.KEYS[9],
    },
};
