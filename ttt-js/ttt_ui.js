(function(root) {
  var TTT = root.TTT = (root.TTT || {});
  
  var UI = TTT.UI = function($el) {
    this.$el = $el;
    this.game = new TTT.Game(this.endgame);
    this.setupHandlers();
  };
  
  var getCell = function(x, y) {
    return $('#' + x + y);
  };
  
  UI.prototype.updateCell = function(row, col) {
    console.log("hello from update cell");
    var $cell = getCell(row, col);
    var gameCell = this.board[row][col];
    console.log($cell);
    $cell.append(gameCell);
  };
  
  UI.prototype.endgame = function(winner) {
    if (winner) {
      alert(winner + " is the winner!");
    } else {
      alert("Tie game.");
    }
  };
  
  UI.prototype.makeBoard = function() {
    for (var row = 0; row < 3; row++) {
      var $row = $("<tr></tr>");
      this.$el.append($row);
      for (var col = 0; col < 3; col++) {
        var $cell = $("<td></td>");
        $cell.attr("id", row + "" + col);
        $cell.attr('data-row', row);
        $cell.attr('data-col', col);
        // $cell.click([row, col, this.updateCell], this.game.move);
        $row.append($cell);
      }
    }
    
    // }
    //
    // this.$el.append($(boardString));
  };
  
  UI.prototype.setupHandlers = function() {
    var that = this;
    this.$el.click('td', function(event) {
      var row = $(event.target).data('row')
      var col = $(event.target).data('col')
      that.game.move([row, col], that.updateCell)
    })
  }
  
})(this)