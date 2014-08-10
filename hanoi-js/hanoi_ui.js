(function(root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  
  var UI = Hanoi.UI = function($el) {
    this.$el = $el;
    this.game = new Hanoi.Game();
  };
  
  UI.prototype.render = function() {
    
    $('.disc').remove();
    
    for(var t = 0; t < this.game.towers.length; t++) {
      for (var d = 0; d < this.game.towers[t].length; d++) {        
        var $discHolder = $('#tower' + t + '>.discHolder' + d);
        
        var $disc = $('<div>');
        var width = Math.floor(100 * (this.game.towers[t][d] / this.game.DISCS));
        $disc.attr("class", "disc");
        $disc.attr("style", "width:" + width + "%");
        $disc.attr("data-tower", t);
        if (d === this.game.towers[t].length - 1) $disc.draggable();

        $discHolder.append($disc);
      }
    }
  };
  
  UI.prototype.letGo = function(event, ui) {
    console.log(ui.helper);
    // var originTower = ui.helper
    // var destinationTower = Math.floor(ui.position.left / window.innerWidth);
  }
  
  UI.prototype.makeTowers = function() {
    var width = Math.floor(100 / this.game.towers.length);
    for(var t = 0; t < this.game.towers.length; t++) {
      var $tower = $('<div>');
      $tower.attr("class", "tower");
      $tower.attr("id", "tower" + t);
      $tower.attr("style", "width: " + width + '%');
      $tower.attr("data-tower", t);
      var that = this;
      $tower.droppable({
        tolerance: "pointer",
        drop: function(event, ui) {
          var origin = ui.draggable.data('tower');
          var destination = $(this).data('tower');
          console.log("origin " + origin);
          console.log("destination " + destination);
          that.game.move(origin, destination);
          that.render();
          if (that.game.isWon()) alert('Victory!');
        }
      });
      console.log($tower.droppable);
      for (var d = this.game.DISCS - 1; d >= 0; d--) {
        var $discHolder = $('<div>');
        $discHolder.attr("class", "discHolder" + d + " discHolder");
        $tower.append($discHolder);
      }
      this.$el.append($tower);
    }
  };
  
})(this)