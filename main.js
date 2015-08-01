var Unicorns = Unicorns || {};

Unicorns.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
Unicorns.game.state.add('Boot', Unicorns.Boot);
Unicorns.game.state.add('Preload', Unicorns.Preload);
Unicorns.game.state.add('MainMenu', Unicorns.MainMenu);
Unicorns.game.state.add('Play', Unicorns.Play);

Unicorns.game.state.start('Boot');
