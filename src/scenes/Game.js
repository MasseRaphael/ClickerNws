import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    

    constructor()
    {
        super('game')
    }

    init()
    {
        
    }

    preload()
    {

        //this.load.image('background', 'assets/')
        this.load.image('dev', 'assets/logo-dev.png')
        this.load.image('market', 'assets/logo-marketing.png')
        this.load.image('design', 'assets/logo-design.png')
        this.load.image('logo', 'assets/logo-nws.svrg')
        
        this.pointer = this.input.activePointer;

    }

    create()
    {
        
    }

    update()
    {
        
    }

}