(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  // var readline = require('readline');
  // var READER = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  var Game = Hanoi.Game = function () {
    this.DISCS = 3;
    this.TOWERS = 3;
    this.towers = [];
    for (var t = 0; t < this.TOWERS; t++) {
      this.towers.push([]);
    }
    for (var d = this.DISCS; d > 0; d--) {
      this.towers[0].push(d);
    }
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    var game = this;

    READER.question("Enter a starting tower: ",function (start) {
      var startTowerIdx = parseInt(start);
      READER.question("Enter an ending tower: ", function (end) {
        var endTowerIdx = parseInt(end);
        game.takeTurn(startTowerIdx,endTowerIdx);
      });
    });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;

    if (game.move(start,end)) {
      console.log(game.towers);
    } else {
      console.log("Invalid move!")
    }

    if (game.isWon()) {
      console.log("You win!");
      READER.close();
    } else {
      game.run();
    }
  }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

// var Game = new this.Hanoi.Game();
// Game.run();
