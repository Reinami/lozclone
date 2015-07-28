var Unicorns = Unicorns || {};

Unicorns.Preload = function(){};

Unicorns.Preload.prototype = {
	preload: function () {
		// Loading Bar
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerX, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		// Load assets
		this.load.spritesheet('assets', 'assets/images/assets.png', 32, 32);
		this.load.text('playerJSON', 'assets/json/player.json');
		this.load.tilemap('overworld', 'assets/json/areas/overworld/1.json', null, Phaser.Tilemap.TILED_JSON)
	},
	create: function () {
		this.state.start('MainMenu');
	},
}
