const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
    this.load.image('background', 'https://opengameart.org/sites/default/files/RockyStonePath_0.png');
}

function create() {
    // Add background
    this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0);

    // Add game title
    this.add.text(config.width / 2, 50, 'The Headsman\'s Tale', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    // Create stick figure player
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff);
    
    // Head
    graphics.strokeCircle(0, -30, 15);
    
    // Body
    graphics.moveTo(0, -15);
    graphics.lineTo(0, 30);
    
    // Arms
    graphics.moveTo(0, 0);
    graphics.lineTo(-20, 20);
    graphics.moveTo(0, 0);
    graphics.lineTo(20, 20);
    
    // Legs
    graphics.moveTo(0, 30);
    graphics.lineTo(-15, 60);
    graphics.moveTo(0, 30);
    graphics.lineTo(15, 60);

    // Convert graphics to texture
    graphics.generateTexture('player', 50, 100);
    graphics.destroy();

    // Create player sprite
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
    player.setCollideWorldBounds(true);

    // Set up cursor keys
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Player movement
    const speed = 160;
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
}
