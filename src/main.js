/**
 * Dragon Ball Fighting Game
 *
 * Nikolaos Sarris
 *
 * A 2-player fighting game inspired by Dragon Ball Z where two legendary saiyans
 * face off in an epic battle. Players use melee attacks, special moves, and
 * defensive blocking to defeat their opponent.
 *
 * Asset sources:
 * - Sprites: spriters-resource.com
 * - Sounds: freesound.org, opengameart.org
 * - Font: Google Fonts (Press Start 2P)
 */

import Game from "../lib/Game.js";
import {
    canvas,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    context,
    stateMachine,
} from "./globals.js";
import TitleScreenState from "./states/game/TitleScreenState.js";
import ControlsScreenState from "./states/game/ControlsScreenState.js";
import PlayState from "./states/game/PlayState.js";
import VictoryState from "./states/game/VictoryState.js";
import GameStateName from "./enums/GameStateName.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute("tabindex", "1"); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.prepend(canvas);

const mapDefinition = await fetch("./config/tilemap.json").then((response) =>
    response.json()
);

//Adds all the states to the state machine.
stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());
stateMachine.add(GameStateName.ControlsScreen, new ControlsScreenState());
stateMachine.add(GameStateName.Play, new PlayState(mapDefinition));
stateMachine.add(GameStateName.Victory, new VictoryState());

stateMachine.change(GameStateName.Play);

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
