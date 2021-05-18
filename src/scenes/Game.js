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
        this.tick = 0;
        this.delai = 1000;
        this.devCost = 10;
        this.marketCost = 10;
        this.designCost = 10;
    }

    preload()
    {
        //  Preload des images
        this.load.image('NWS', 'assets/logo_nws.png');
        this.load.image('dev', 'assets/logo-dev.png');
        this.load.image('market', 'assets/logo-marketing.png');
        this.load.image('design', 'assets/logo-design.png');

        //  Preload des contrôles (Souris)
        this.pointer = this.input.activePointer;
    }

    create()
    {   
        //  Pose des images
        this.nws = this.physics.add.image(400, 300, 'NWS').setScale(1);
        this.dev = this.physics.add.image(100, 100, 'dev');
        this.market = this.physics.add.image(700, 100, 'market');
        this.design = this.physics.add.image(100, 500, 'design');

        // Compteurs
        const styleScore = {fontSize: 30};
        this.scoreText = this.add.text(400, 10, `Score: ${this.score}`, styleScore).setOrigin(0.5, 0);

        const styleDev = {fontSize: 20};
        this.devText = this.add.text(100, 110, `Dev: ${this.countDev}`, styleDev).setOrigin(0.5, 0);
        
        const styleMarket = {fontSize: 20};
        this.marketText = this.add.text(700, 110, `Marketteux: ${this.countMarket}`, styleMarket).setOrigin(0.5, 0);
        
        const styleDesign = {fontSize: 20};
        this.designText = this.add.text(100, 390, `Designer: ${this.countDesign}`, styleDesign).setOrigin(0.5, 0);

        const styleTick = {fontSize: 20};
        this.tickText = this.add.text(300, 0,`Nombre de point par tick: ${this.tick*1000/this.delai}`, styleTick).setOrigin(0.5, 0);

        const styleGain = {fontSize: 20};
        this.gainText = this.add.text(300, 100,`Gain: ${this.gain} par clic`, styleGain).setOrigin(0.5, 0);

        // Gestion des clicks
        this.nws.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {   // Utilisation d'un lambda fonction qui reprend le scope du dessus, contrairement à function qui nécessite un réassignement du "this"
            this.collectScore(this.gain);
        });

        this.dev.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            if(this.score < this.devCost)
            {
                return
            }else{
                this.devCode();
                this.score -= this.devCost;
                this.devCost += this.devCost/10
            }
            
        });

        this.market.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            if(this.score < this.marketCost)
            {
                return
            }else{
                this.marketBlatter();
                this.score -= this.marketCost;
                this.marketCost += this.marketCost/10
            }
            
        });

        this.design.setInteractive().on('pointerdown', (pointer, localX, localY, event) => {
            if(this.score < this.designCost)
            {
                return
            }else{
                this.designDraw();
                this.score -= this.designCost;
                this.designCost += this.designCost/10
            }
            
        });
    }

    collectScore(gain)
    {
        console.log(gain);
        this.score += gain;

        this.scoreText.text = `Score: ${this.score.toFixed(1)}`;
    }

    devCode()
    {
        this.countDev++;
        this.tick = this.countDev;
        
        this.tickText.text = `Nombre de point par tick: ${(this.tick*1000/this.delai).toFixed(2)}`
        this.devText.text = `Dev: ${this.countDev}`;
        
    }

    marketBlatter()
    {
        this.countMarket++;
        this.gain += 0.1;
        
        this.gainText.text = `Gain: ${this.gain.toFixed(1)} par clic`;
        this.marketText.text = `Marketteux: ${this.countMarket}`;
    }

    designDraw()
    {
        this.countDesign++;
        this.delai  = this.delai*0.99;
        
        this.tickText.text = `Nombre de point par tick: ${(this.tick*1000/this.delai).toFixed(2)}`
        this.designText.text = `Design: ${this.countDesign}`;
    }

    update(total, dt)
    {
        this.collectScore(this.CalculDelta(dt, this.tick));
    }

    CalculDelta(dt, ups)    //  Unité par secondes
    {
        return (dt / this.delai * ups);
    }
}