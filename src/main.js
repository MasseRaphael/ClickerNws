import Phaser from './lib/phaser.js';

import Game from './scenes/Game.js';


export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
})

console.dir(Phaser);