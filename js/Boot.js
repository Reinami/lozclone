var Unicorns = Unicorns || {};

Unicorns.Boot = function(){};

Unicorns.Boot.prototype = {
	preload: function() {
		// Load the preload screen images
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
	},
	create: function() {
		// Loading Screen background
		this.game.stage.backgroundColor = '#fff';

		// Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Start Preloader
		this.state.start('Preload');
	},
};
