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
        this.bonus = 0.1;
        this.tick = 0;
        this.cost = 10;
        this.delay = 1000;
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
        
        this.nws.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.collectScore(this.gain)
        });

        this.dev.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.devCoding()
        });

        this.market.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.marketBlatter()
        });

        this.design.setInteractive().on('pointerdown', (pointer, localX, localY, event) =>{
            this.designDraw()
        });
        
    }

    collectScore(gain)
    {
        this.score += gain;
        this.scoreText.text = `Score: ${this.score.toFixed(1)}`;
    }

    devCoding()
    {
        this.countDev ++;
        this.tick += this.countDev;
        this.devText.text = `Dev: ${this.countDev}`;
    }

    marketBlatter()
    {
        this.countMarket ++;
        this.gain += this.bonus
        this.marketText.text = `Marketeux: ${this.countMarket}`;
    }

    designDraw()
    {
        this.countDesign ++;
        this.delay = this.delay*0.99;
        this.designText.text = `Designer: ${this.countDesign}`;
    }

    update(total, dt)
    {
        this.collectScore(this.CalculDelta(dt, this.tick));
    }

    CalculDelta(dt, ups)    //  Unité par secondes
    {
        return (dt / this.delay * ups);
    }

}