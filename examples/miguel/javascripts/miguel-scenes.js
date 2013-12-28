;Quintus.MiguelScenes = function(Q) {

  Q.scene("title",function(stage) {
      var bg = stage.insert(new Q.Background());
      var shoot = stage.insert(new Q.Shooter());
      var zoombie = stage.insert(new Q.Walker({ }));

      window.listPlaces = [];
      function placeMe(){
        stage.insert(new Q.Shooter({
          x: this.p.x,
          y: this.p.y,
        }));
        Q._each(listPlaces, function(a){
          a.destroy();
        });
      }
      stage.insert(new Q.UI.Button({
        asset: 'actors/Shoot.png',
        y: 150,
        x: 100,
        border: 2,
      }, function() {
        //what to do here^^
        for (var y = 0; y <= 5; y++) {
          for (var x = 0; x <= 8; x++) {
            var pl = new Q.Place({
              x : x * 84 + 280,
              y : y * 100 + 150
            }, placeMe);
            listPlaces.push(pl);
            stage.insert(pl);
          }
        }
      }));
  });
};

