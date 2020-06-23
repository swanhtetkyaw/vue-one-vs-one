var app = new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		lowHealthHuman: false,
		lowHealthMoster: false,
		turns: [],
		btnAttack: false,
		btnSpecial: false,
		btnHeal: false,
		specialAttackCount: 0,
		healCount: 0,
		shake: false
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.lowHealthHuman = false;
			this.lowHealthMoster = false;
			this.specialAttackCount = 0;
			this.healCount = 0;
			this.btnAttack = false;
			this.btnSpecial = false;
			this.btnHeal = false;
			this.turns = [];
		},
		attack: function() {
			this.btnAttack = true;
			let dealDamage = this.calculateDamage(3, 10);
			this.monsterHealth -= dealDamage;
			this.turns.push({
				isPlayer: true,
				text: `Player hit Monster for ${dealDamage}`
			});
			this.changeRedHealthBar();
			if (this.checkWin()) {
				return;
			}
			setTimeout(this.monsterAttack, 1000);
			// this.monsterAttack();
		},
		specialAttack: function() {
			this.btnSpecial = true;
			this.specialAttackCount += 1;

			let dealDamage = this.calculateDamage(10, 20);
			this.monsterHealth -= dealDamage;
			this.turns.push({
				isPlayer: true,
				text: `Player hit Monster with Special-Attack for ${dealDamage}`
			});
			this.changeRedHealthBar();
			if (this.checkWin()) {
				return;
			}

			setTimeout(this.monsterAttack, 1000);
		},
		heal: function() {
			this.btnHeal = true;
			this.healCount += 1;

			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.turns.push({
				isPlayer: true,
				text: `Player Heal himself for 10`
			});

			setTimeout(this.monsterAttack, 1000);
		},
		giveUp: function() {
			this.quitGame();
		},
		calculateDamage: function(min, max) {
			var damage = Math.max(Math.floor(Math.random() * max), min);
			return damage;
		},
		checkWin: function() {
			if (this.monsterHealth <= 0) {
				if (confirm('You Win...Play again?')) {
					this.startGame();
				} else {
					this.quitGame();
				}
				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm('You Lost...Play again?')) {
					this.startGame();
				} else {
					this.quitGame();
				}
				return true;
			}
			return false;
		},
		monsterAttack: function() {
			this.btnAttack = false;
			let countS = this.specialAttackCount;
			let countH = this.healCount;
			if (countS <= 2) {
				this.btnSpecial = false;
			}

			if (countH <= 2) {
				this.btnHeal = false;
			}
			let dealDamage = this.calculateDamage(5, 15);
			this.playerHealth -= dealDamage;
			this.turns.push({
				isPlayer: false,
				text: `Monster hit player for ${dealDamage}`
			});
			this.changeRedHealthBar();
			this.checkWin();
			this.btnDisable = false;
		},
		quitGame: function() {
			this.gameIsRunning = false;
			this.lowHealthHuman = false;
			this.lowHealthMoster = false;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		changeRedHealthBar: function() {
			if (this.monsterHealth <= 30) {
				this.lowHealthMoster = true;
			} else if (this.playerHealth <= 30) {
				this.lowHealthHuman = true;
			}
		}
	}
});
