function Player(game){
	this.game = game;
};

Player.prototype.create = function() {
	this.playerJSON = JSON.parse(this.game.cache.getText('playerJSON'));

	// Create the player
	this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'assets', this.playerJSON.sprite)
	this.player.scale.setTo(this.playerJSON.scale);

	// Enable Player Physics
	this.game.physics.arcade.enable(this.player);
	this.player.speed = this.playerJSON.speed;
	this.player.body.collideWorldBounds = true;
	this.player.direction = 'up';
	this.player.justFired = false;
	this.player.shotCooldown = this.playerJSON.shotCooldown;

	// Create controls
	this.cursors = this.game.input.keyboard.createCursorKeys();
	this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

Player.prototype.update = function() {
	// This will stop the player from continuing to move
	var self = this;

	var stopMovement = function() {
		self.player.body.velocity.x = 0;
		self.player.body.velocity.y = 0;
	}

	if (this.cursors.up.isDown) {
		stopMovement();
		this.player.body.velocity.y = -this.player.speed;
		this.player.direction = 'up';
	}
	else if (this.cursors.down.isDown) {
		stopMovement();
		this.player.body.velocity.y = this.player.speed;
		this.player.direction = 'down';
	}
	else if (this.cursors.left.isDown) {
		stopMovement();
		this.player.body.velocity.x = -this.player.speed;
		this.player.direction = 'left';
	}
	else if (this.cursors.right.isDown) {
		stopMovement();
		this.player.body.velocity.x = this.player.speed;
		this.player.direction = 'right';
	}
	else {
		stopMovement();
	}

	if (this.shootButton.isDown) {
		this.playerShot();
	}

	// Check to see if player can fire again
	if (this.player.justFired && this.player.nextShotTime && this.game.time.now >= this.player.nextShotTime) {
		this.player.justFired = false;
	}
}

Player.prototype.playerShot = function() {
	if (!this.player.justFired) {
		this.player.justFired = true;
		this.player.nextShotTime = this.game.time.now + this.player.shotCooldown;

		// Calculate Shot spawn values
		var spawnDistance = 35;
		var shotSpeed = 300;
		var direction = this.player.direction;
		var location = this.player.world;
		var spawnLocation = {'x': location.x, 'y': location.y}
		if (direction==='left') {
			spawnLocation.x -= spawnDistance
		}
		else if (direction==='right') {
			spawnLocation.x += spawnDistance
		}
		else if (direction==='up') {
			spawnLocation.y -= spawnDistance
		}
		else if (direction==='down') {
			spawnLocation.y += spawnDistance
		}

		// Spawn Shot
		var playerShot = this.game.add.sprite(spawnLocation.x, spawnLocation.y, 'assets', 418);
		playerShot.animations.add('move', [418, 419, 420], 5, false);
		playerShot.animations.play('move');
		this.game.physics.arcade.enable(playerShot);
		playerShot.checkWorldBounds = true;
		playerShot.outOfBoundsKill = true;

		// Shot physics
		if (direction==='left') {
			playerShot.body.velocity.x -= shotSpeed
		}
		else if (direction==='right') {
			playerShot.body.velocity.x += shotSpeed
		}
		else if (direction==='up') {
			playerShot.body.velocity.y -= shotSpeed
		}
		else if (direction==='down') {
			playerShot.body.velocity.y += shotSpeed
		}
	}
}
