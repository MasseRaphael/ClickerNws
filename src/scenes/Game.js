import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    

    constructor()
    {
        super('game')
    }

    init()
    {
        this.score = 0;
        this.countDev = 0;
        this.countMarket = 0;
        this.countDesign = 0;
        this.gain = 1;
        this.bonus = 0;
        this.tick = 1;
        
    }

    preload()
    {

        this.load.image('dev', 'assets/logo-dev.png');
        this.load.image('market', 'assets/logo-marketing.png');
        this.load.image('design', 'assets/logo-design.png');
        this.load.image('nws', 'assets/logo_nws.png');
        
        this.pointer = this.input.activePointer;

    }

    create()
    {
        console.log(this.gain)
        this.nws = this.physics.add.image(400, 300, 'nws');
        this.dev = this.physics.add.image(100, 100, 'dev');
        this.market = this.physics.add.image(700, 100, 'market');
        this.design = this.physics.add.image(100, 500, 'design');

        const styleScore = {fontSize: 20};
        this.scoreText = this.add.text(400, 10, `Score: ${this.score}`, styleScore)
            .setOrigin(0.5, 0);
        const styleStudents = {fontSize: 20};
        this.devText = this.add.text(100, 150, `Dev: ${this.countDev}`, styleStudents)
            .setOrigin(0.5, 0);
        this.marketText = this.add.text(700, 150, `Marketeux: ${this.countMarket}`, styleStudents)
            .setOrigin(0.5, 0);
        this.designText = this.add.text(100, 550, `Designer: ${this.countDesign}`, styleStudents)
            .setOrigin(0.5, 0);
        

        
        let clic = this;
        this.nws.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            clic.collectScore(this.gain)
            console.log(this.gain)
        });
        
    }

    collectScore(gain)
    {
        this.score += gain;
        console.log(gain)
        //  const value = `Score: ${this.score}`;
        this.scoreText.text = `Score: ${Math.floor(this.score)}`;
    }

    update()
    {
        
    }

}