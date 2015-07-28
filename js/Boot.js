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

		// Set scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;

		// Center the Game
		this.scale.pageAlignHorizontally = true;

		// Automatically set screen size
		this.scale.setScreenSize(true);

		// Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Start Preloader
		this.state.start('Preload');
	},
};
