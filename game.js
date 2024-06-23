// Configuration object for the Phaser game
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
            debug: true // Enable physics debug mode
        }
    }
};

// Initialize the game with the configuration
const game = new Phaser.Game(config);

// Global variables
let player;
let cursors;
let debugText;

// Asset loading
function preload() {
    this.load.image('background', 'https://opengameart.org/sites/default/files/RockyStonePath_0.png');
}

// Game world creation
function create() {
    // Add background
    this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0);

    // Add game title
    this.add.text(config.width / 2, 50, 'The Headsman\'s Tale', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    // Create stick figure player
    createPlayer.call(this);

    // Set up cursor keys for input
    cursors = this.input.keyboard.createCursorKeys();

    // Add debug text
    debugText = this.add.text(10, 10, 'Debug Info', { fontSize: '16px', fill: '#ffffff' });
}

// Game loop
function update() {
    // Handle player movement
    handlePlayerMovement();

    // Update debug information
    updateDebugInfo();
}

// Function to create the player character
function createPlayer() {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff);
    
    // Draw stick figure
    graphics.strokeCircle(0, -30, 15); // Head
    graphics.moveTo(0, -15);
    graphics.lineTo(0, 30); // Body
    graphics.moveTo(0, 0);
    graphics.lineTo(-20, 20); // Left arm
    graphics.moveTo(0, 0);
    graphics.lineTo(20, 20); // Right arm
    graphics.moveTo(0, 30);
    graphics.lineTo(-15, 60); // Left leg
    graphics.moveTo(0, 30);
    graphics.lineTo(15, 60); // Right leg

    // Convert graphics to texture
    graphics.generateTexture('player', 50, 100);
    graphics.destroy();

    // Create player sprite with physics
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
    player.setCollideWorldBounds(true); // Prevent player from moving off-screen
}

// Function to handle player movement
function handlePlayerMovement() {
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

// Function to update debug information
function updateDebugInfo() {
    debugText.setText([
        `Player X: ${player.x.toFixed(2)}`,
        `Player Y: ${player.y.toFixed(2)}`,
        `Velocity X: ${player.body.velocity.x.toFixed(2)}`,
        `Velocity Y: ${player.body.velocity.y.toFixed(2)}`
    ]);
}
