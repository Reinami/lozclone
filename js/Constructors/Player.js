function Player(game, map){
	// Game	
	this.game = game;
	this.map = map;
	
	// Player Sprite
	this.sprite = null;
	
	// Player Controls
	this.cursors = null;
	this.fireButton = null;
	
	// Player data
	this.playerJSON = JSON.parse(this.game.cache.getText('playerJSON'));
	this.direction = 'up';
	this.justFired = false;
	this.shotCooldown = this.playerJSON.shotCooldown;
};

Player.prototype = {
	create: function () {
		// Create the player
		var playerStartPosition = {'x': (this.map.mapBounds.minX + this.map.mapBounds.maxX)/2, 'y': (this.map.mapBounds.minY + this.map.mapBounds.maxY)/2};
		
		this.sprite = this.game.add.sprite(playerStartPosition.x, playerStartPosition.y, 'assets', this.playerJSON.sprite);
		this.sprite.scale.setTo(this.playerJSON.scale);
		
		// Enable Player Physics
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.speed = this.playerJSON.speed;
	
		// Create controls
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function() {
		var self = this;
		
		// Check if player is going beyond world bounds
		this.checkMapBounds();
		
		// This will stop the player from continuing to move
		var stopMovement = function() {
			self.sprite.body.velocity.x = 0;
			self.sprite.body.velocity.y = 0;
		};
	
		if (this.cursors.up.isDown) {
			stopMovement();
			this.sprite.body.velocity.y = -this.sprite.speed;
			this.direction = 'up';
		}
		else if (this.cursors.down.isDown) {
			stopMovement();
			this.sprite.body.velocity.y = this.sprite.speed;
			this.direction = 'down';
		}
		else if (this.cursors.left.isDown) {
			stopMovement();
			this.sprite.body.velocity.x = -this.sprite.speed;
			this.direction = 'left';
		}
		else if (this.cursors.right.isDown) {
			stopMovement();
			this.sprite.body.velocity.x = this.sprite.speed;
			this.direction = 'right';
		}
		else {
			stopMovement();
		}
	
		if (this.fireButton.isDown) {
			this.playerShot();
		}
	
		// Check to see if player can fire again
		if (this.justFired && this.nextShotTime && this.game.time.now >= this.nextShotTime) {
			this.justFired = false;
		}
	},
	playerShot: function () {
		if (!this.justFired) {
			this.justFired = true;
			this.nextShotTime = this.game.time.now + this.shotCooldown;
	
			// Calculate Shot spawn values
			// TODO: Move these to a constants section
			var spawnDistance = 35;
			var shotSpeed = 300;
			var playerLocation = this.sprite.world;
			
			var shotSpawnLocation = {'x': playerLocation.x, 'y': playerLocation.y};
			if (this.direction==='left') {
				shotSpawnLocation.x -= spawnDistance;
			}
			else if (this.direction==='right') {
				shotSpawnLocation.x += spawnDistance;
			}
			else if (this.direction==='up') {
				shotSpawnLocation.y -= spawnDistance;
			}
			else if (this.direction==='down') {
				shotSpawnLocation.y += spawnDistance;
			}
	
			// Spawn Shot
			var playerShot = this.game.add.sprite(shotSpawnLocation.x, shotSpawnLocation.y, 'assets', 418);
			
			playerShot.scale.setTo(0.75);
			playerShot.animations.add('move', [418, 419, 420], 5, false);
			playerShot.animations.play('move');
			
			this.game.physics.arcade.enable(playerShot);
			playerShot.checkWorldBounds = true;
			playerShot.outOfBoundsKill = true;
	
			// Shot physics
			if (this.direction==='left') {
				playerShot.body.velocity.x -= shotSpeed;
			}
			else if (this.direction==='right') {
				playerShot.body.velocity.x += shotSpeed;
			}
			else if (this.direction==='up') {
				playerShot.body.velocity.y -= shotSpeed;
			}
			else if (this.direction==='down') {
				playerShot.body.velocity.y += shotSpeed;
			}
		}
	},
	
	checkMapBounds: function() {
		var playerPosition = this.sprite.position;
		var mapBounds = this.map.mapBounds;
		
		if (playerPosition.y <= mapBounds.minY) {
			this.map.scrollDirection = 'up';
			this.sprite.y = this.sprite.y - TILESPACING;
		}
		else if (playerPosition.y >= mapBounds.maxY) {
			this.map.scrollDirection = 'down';
			this.sprite.y = this.sprite.y + TILESPACING;
		}
		else if (playerPosition.x <= mapBounds.minX) {
			this.map.scrollDirection = 'left';
			this.sprite.x = this.sprite.x - TILESPACING;
		}
		else if (playerPosition.x >= mapBounds.maxX) {
			this.map.scrollDirection = 'right';
			this.sprite.x = this.sprite.x + TILESPACING;
		}
	}
};